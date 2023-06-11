import axios from "axios";

export const pageinate = async (req, res) => {
  try {
    const baseUrl = 'https://api.petfinder.com';
    const headers = {
      "Content-type": "application/x-www-form-urlencoded",
      "Authorization": `Bearer ${ req.session.accessToken }`
    }

    let query;
    if (req.body.previousPage) {
      query = await axios.get(`${ baseUrl }${ req.body.previousPage }`, { headers: headers })
    } else if (req.body.nextPage) {
      query = await axios.get(`${ baseUrl }${ req.body.nextPage }`, { headers: headers })
    }

    res.render('pages/dog-page.ejs', {
      data: query.data
    })
  } catch (err) {
    console.log(err);
    res.send(err)
  }
}

