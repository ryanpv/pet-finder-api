import axios from "axios";
import { breedsCache } from "../filter-cache/breeds-cache.js";

export const paginate = async (req, res) => {
  try {
    const baseUrl = 'https://api.petfinder.com';
    const headers = {
      "Content-type": "application/x-www-form-urlencoded",
      "Authorization": `Bearer ${ req.session.petApi_accessToken }`
    }

console.log('req body for pagination: ', req.body);
    let query;
    if (req.body.previousPage) {
      query = await axios.get(`${ baseUrl }${ req.body.previousPage }`, { headers: headers })
    } else if (req.body.nextPage) {
      query = await axios.get(`${ baseUrl }${ req.body.nextPage }`, { headers: headers })
    }

    res.render('pages/dog-page.ejs', {
      data: query.data,
      breeds: await breedsCache(req, res),
      reqUrl: req.originalUrl
    })
  } catch (err) {
    console.log(err);
    res.send(err)
  }
}

