import { breedsCache } from "../filter-cache/breeds-cache.js";
import { getPetList } from "./get-pet-list.js";

export const petData = async (req, res) => {
  try {
    const fetchedPetData = await getPetList(req, res)
    const fetchBreeds = await breedsCache(req, res)
    res.render('pages/dog-page.ejs', {
      data: fetchedPetData.data,
      breeds: fetchBreeds,
      reqUrl: req.originalUrl
    });    
  } catch (error) {
    res.status(500).send(`<p>Error fetching pet data.</p> <a href='/'>back to home</a>`);
  }
}