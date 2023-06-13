import { breedsCache } from "../filter-cache/breeds-cache.js";
import { getAllDogs } from "./get-all-dogs.js";

export const dogPage = async (req, res) => {
  const fetchedDogs = await getAllDogs(req, res)
  const fetchBreeds = await breedsCache(req, res)
  res.render('pages/dog-page.ejs', {
    data: fetchedDogs.data,
    breeds: fetchBreeds
  })
  // res.end()
}