import axios from "axios";

export const petApiToken = async (req, res, next) => {
  try {
    if (req.path === '/clear') {
      console.log('clearing sessions');
      return next();
    } else if (!req.session.isAuthenticated || req.session.tokenExpiry < Date.now()) {
      console.log('new session being created');
      const body = `grant_type=client_credentials&client_id=${ process.env.PET_FINDER_KEY }&client_secret=${ process.env.PET_FINDER_SECRET }`
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*'
    };
      const testQ = await axios.post('https://api.petfinder.com/v2/oauth2/token', body, { headers: headers })

      req.session.isAuthenticated = true;
      req.session.accessToken = testQ.data.access_token
      req.session.tokenExpiry = Date.now() + 3600 * 1000

      // console.log('token res: ', testQ.data);
      // console.log('new session: ', req.session);
      next();
    } else {
      console.log('session exists');
      next();
    }
  } catch (err) {
    console.log('some error', err);
    res.end();
  }
};
