import axios from "axios";

export const getPetList = async (req, res) => {
  try {
    console.log(' pet list paginated: ', req.originalUrl);
    const petType = req.originalUrl.includes('dogs-for-adoption') ? 'dog' : req.originalUrl.includes('cats-for-adoption') ? 'cat' : null
    const pageNumber = req.params.pageNumber ? req.params.pageNumber : '1' // Should be string
    // res.locals.url = req.originalUrl;
    const filters = []; // to collect query filters

    if (req.session.locationInput !== '' && req.session.locationInput !== undefined) {
      console.log('session push');
      // console.log('session: ', req.session);
      filters.push(`&location=${ req.session.locationInput }`)
    } else if (req.body.locationInput !== '' && req.body.locationInput !== undefined) {
      console.log('req body push');
      filters.push(`&location=${ req.body.locationInput }`)
      req.session.locationInput = req.body.locationInput;
    }

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

    if (req.body.breedInput !== undefined) {
      filters.push(`&breed=${ req.body.breedInput }`)
    }

    // console.log('get-all-dogs query: ', req.body);

    // Remember latest query in case user wants to query with same filters. - Solution to not having frontend state.
    req.session.lastQuery = filters.join('').toString();
    
    const headers = {
      "Content-type": "application/x-www-form-urlencoded",
      "Authorization": `Bearer ${ req.session.petApi_accessToken }`
    };

    const query = await axios.get(`https://api.petfinder.com/v2/animals?type=${ petType }&limit=9${ filters.join('').toString() }&page=${ pageNumber }`, { headers: headers })
    // const query2 = await axios.get(`https://api.petfinder.com/v2/types`, { headers: headers })
    // console.log('query results: ', query.data.animals);
    // console.log('fetched dog query: ', query.data);

// console.log('query: ', query2.data.types[0]);
    return query;

  } catch (err) {
    console.log(err.response);
    return err
  }
}