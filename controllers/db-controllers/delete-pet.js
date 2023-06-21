import { Pets } from "../../db/db-conn.js";

export const deletePet = async (req, res) => {
  try {
    await Pets.findByIdAndDelete({ _id: req.body._id })

    res.redirect('/user/favourites-list')
  } catch (error) {
    console.log(error);
    res.send(`<p>Delete request error, try again</p><a href='/'>back to home</a>`);
  }
}