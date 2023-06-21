import axios from "axios";

export const petProfile = async (req, res) => {
  try {
    const headers = {
      "Content-type": "application/x-www-form-urlencoded",
      "Authorization": `Bearer ${ req.session.petApi_accessToken }`
    }
    const fetchDogProfile = await axios.get(`https://api.petfinder.com/v2/animals/${ req.params.animalId }`, { headers: headers })
  
    const result = []
    Object.keys(fetchDogProfile.data.animal.environment).forEach((env) => {
      if (fetchDogProfile.data.animal.environment[env] === false) {
        result.push(env)
      }
    })
  
    res.render('pages/pet-profile.ejs', {
      data: fetchDogProfile.data.animal,
      environment: result,
      reqUrl: req.originalUrl
    });    
  } catch (error) {
    console.log(error);
    res.status(500).send(`<p>Unable to fetch pet profile. Please try again</p> <a href='/'>back to home</a>`);
  }
}