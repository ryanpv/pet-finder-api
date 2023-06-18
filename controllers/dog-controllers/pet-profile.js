import axios from "axios";

export const petProfile = async (req, res) => {
  console.log('animalid : ', req.params.animalId);
  // if (req.params.animalId !== Number) {
  //   return;
  // }
  const headers = {
    "Content-type": "application/x-www-form-urlencoded",
    "Authorization": `Bearer ${ req.session.accessToken }`
  }
  const fetchDogProfile = await axios.get(`https://api.petfinder.com/v2/animals/${ req.params.animalId }`, { headers: headers })

  const result = []
  Object.keys(fetchDogProfile.data.animal.environment).forEach((env) => {
    if (fetchDogProfile.data.animal.environment[env] === false) {
      result.push(env)
    }
  })
  // console.log('result: ', result);

  console.log('query: ', fetchDogProfile.data.animal);
  res.render('pages/pet-profile.ejs', {
    data: fetchDogProfile.data.animal,
    environment: result
  })
  // res.end()
}