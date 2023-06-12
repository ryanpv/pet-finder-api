import axios from "axios";

export const getAllDogs = async (req, res) => {
  const pageNumber = req.params.pageNumber ? req.params.pageNumber : 1
  const filters = []; // to collect query filters
  
    if (req.params.breed !== undefined) {
      filters.push(`&breed=${ req.params.breed }`)
    }
  
    if (req.params.age !== undefined) {
      filters.push(`&age=${ req.params.age }`)
    }
  
    if (req.params.color !== undefined) {
      filters.push(`&color=${ req.params.color }`)
    }
  
    if (req.params.gender !== undefined) {
      filters.push(`&gender=${ req.params.gender }`)
    }
  
    if (req.body.petNameSearch !== undefined) {
      filters.push(`&name=${ req.body.petNameSearch }`)
    }

  
  const headers = {
    "Content-type": "application/x-www-form-urlencoded",
    "Authorization": `Bearer ${ req.session.accessToken }`
  };
  const query = await axios.get(`https://api.petfinder.com/v2/animals?type=dog&location=ca&limit=9${ filters.join('').toString() }&page=${ pageNumber }`, { headers: headers })
  // console.log('query results: ', query.data.animals);

  return query;
}