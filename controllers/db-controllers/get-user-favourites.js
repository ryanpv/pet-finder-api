import { Pets } from "../../db/db-conn.js";

export const getFavourites = async (req, res) => {
  try {
    const getAllPets = await Pets.find({ userId: req.session.userId })
    console.log('pets: ', getAllPets);

    res.render('pages/favourites-page.ejs', {
      savedPets: getAllPets,
      reqUrl: req.originalUrl
    })
  } catch (error) {
    console.log(error);
    res.end();
  }
}