import axios from "axios";
import NodeCache from "node-cache";
const cache = new NodeCache();

export const breedsCache = async (req, res) => {
  try {
    console.log('requrl breeds-cache.js: ', req.originalUrl);
    const petType = req.originalUrl.includes('dogs-for-adoption') ? 'dog' : req.originalUrl.includes('cats-for-adoption') ? 'cat' : null
    const headers = {
      "Content-type": "application/x-www-form-urlencoded",
      "Authorization": `Bearer ${ req.session.petApi_accessToken }`
    };
    const breedsKey = petType === 'dog' ? 'dogKey' : petType === 'cat' ? 'catkey' : null
    console.log('breed key', breedsKey);
    const cachedResponse = cache.get(breedsKey);
    
    if (cachedResponse !== undefined) {
      console.log('returned cachedResponse');
      return cachedResponse
    } else {
      const fetchBreeds = await axios.get(`https://api.petfinder.com/v2/types/${ petType }/breeds`, { headers: headers })
      console.log('no cache found');
      cache.set(breedsKey, fetchBreeds.data.breeds)
      return fetchBreeds.data.breeds
    }
  } catch (err) {
    return err
  }
}