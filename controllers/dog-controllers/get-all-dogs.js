import axios from "axios";

export const getAllDogs = async (req, res) => {
  const pageNumber = req.params.pageNumber ? req.params.pageNumber : 210
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

  if (req.params.name !== undefined) {
    filters.push(`&name=${ req.params.name }`)
  }


  // console.log('filters: ', filters.join('').toString());
  
  const headers = {
    "Content-type": "application/x-www-form-urlencoded",
    "Authorization": `Bearer ${ req.session.accessToken }`
  }
  const query = await axios.get(`https://api.petfinder.com/v2/animals?type=dog&location=ca&limit=9&page=${ pageNumber }${ filters.join('').toString() }`, { headers: headers })
  console.log('query results: ', query.data.animals[0]);

  return query
}