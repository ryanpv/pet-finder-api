import { breedsCache } from "../filter-cache/breeds-cache.js";
import { getPetList } from "./get-pet-list.js";

export const petData = async (req, res) => {
  const fetchedPetData = await getPetList(req, res)
  const fetchBreeds = await breedsCache(req, res)
  res.render('pages/dog-page.ejs', {
    data: fetchedPetData.data,
    breeds: fetchBreeds,
    reqUrl: req.originalUrl
  })
  // res.end()
}