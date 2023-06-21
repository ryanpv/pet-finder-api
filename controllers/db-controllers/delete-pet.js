import { Pets } from "../../db/db-conn.js";

export const deletePet = async (req, res) => {
  try {
    const deletePetReqest = await Pets.findByIdAndDelete({ _id: req.body._id })
    console.log('delete ', deletePetReqest);

    res.redirect('/user/favourites-list')
  } catch (error) {
    console.log(error);
    res.send(`<p>Delete request error, try again</p><a href='/'>back to home</a>`);
  }
}