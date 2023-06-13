import axios from "axios";
import NodeCache from "node-cache";
const cache = new NodeCache();

export const breedsCache = async (req, res) => {
  try {
    const headers = {
      "Content-type": "application/x-www-form-urlencoded",
      "Authorization": `Bearer ${ req.session.accessToken }`
    };
    const breedsKey = 'breedKey'
    const cachedResponse = cache.get(breedsKey);
    
    if (cachedResponse !== undefined) {
      console.log('returned cachedResponse');
      return cachedResponse
    } else {
      const fetchBreeds = await axios.get(`https://api.petfinder.com/v2/types/dog/breeds`, { headers: headers })
      console.log('no cache found');
      cache.set(breedsKey, fetchBreeds.data.breeds)
      return fetchBreeds.data.breeds
    }
  } catch (err) {
    return err
  }
}