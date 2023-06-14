import axios from "axios";

export const getAllDogs = async (req, res) => {
  try {
    const pageNumber = req.params.pageNumber ? req.params.pageNumber : 1
    const filters = []; // to collect query filters
    
      // if (req.body.breedInput !== undefined) {
      //   filters.push(`&breed=${ req.body.breedInput }`)
      // }
    
      if (req.body.ageInput !== undefined) {
        filters.push(`&age=${ req.body.ageInput }`)
      }
    
      if (req.body.colorInput !== undefined) {
        filters.push(`&color=${ req.body.colorInput }`)
      }
    
      if (req.body.genderInput !== undefined) {
        filters.push(`&gender=${ req.body.genderInput }`)
      }
    
      if (req.body.petNameSearch !== undefined) {
        filters.push(`&name=${ req.body.petNameSearch }`)
      }
  
      // console.log('get-all-dogs query: ', req.body);
      console.log('filters: ', filters.join('').toString());
    
    const headers = {
      "Content-type": "application/x-www-form-urlencoded",
      "Authorization": `Bearer ${ req.session.accessToken }`
    };
    console.log("color: ", req.body);
    const query = await axios.get(`https://api.petfinder.com/v2/animals?type=dog&&limit=9${ filters.join('').toString() }&page=${ pageNumber }`, { headers: headers })
    // const query2 = await axios.get(`https://api.petfinder.com/v2/types`, { headers: headers })
    // console.log('query results: ', query.data.animals);

// console.log('query: ', query2.data.types[0]);
  
    return query;

  } catch (err) {
    console.log(err.response);
  }
}