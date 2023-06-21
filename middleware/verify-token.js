import { getAuth } from "firebase-admin/auth";

export const verifyFirebaseToken = async (req, res, next) => {
  try {
    const userAuthenticated = req.session.userAuthenticated;
    const firebaseToken = req.session.access_token;

    if (userAuthenticated && firebaseToken) {
      const decodeFirebaseToken = await getAuth().verifyIdToken(firebaseToken);
      req.user = decodeFirebaseToken;

      next();
    } else {
      req.session.destroy();
      res.clearCookie('currentUser');

      res.send(`<p>User unverified, please log in and try again</p><a href='/login'>back to LOGIN</a>`)
    }
  } catch (err) {
    res.send(`<p>Unable to verify user, please try again</p><a href='/login'>back to LOGIN</a>`)
  }
}