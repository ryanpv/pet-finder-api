import { Pets } from "../../db/db-conn.js";

export const getFavourites = async (req, res) => {
  try {
    const getAllPets = await Pets.find({ userId: req.session.userId })

    res.render('pages/favourites-page.ejs', {
      savedPets: getAllPets,
      reqUrl: req.originalUrl
    })
  } catch (error) {
    console.log(error);
    res.status(400).send(`<p>Failed to fetch favourites list. Try refreshing page/logging in again.</p> <a href='/login'>back to login</a>`);
  }
}