import axios from "axios";

export const dogProfile = async (req, res) => {
  const headers = {
    "Content-type": "application/x-www-form-urlencoded",
    "Authorization": `Bearer ${ req.session.accessToken }`
  }
  const fetchDogProfile = await axios.get(`https://api.petfinder.com/v2/animals/${ req.params.animalId }`, { headers: headers })

  const result = []
  Object.keys(fetchDogProfile.data.animal.environment).forEach((env) => {
    console.log('inside: ', env);
    if (fetchDogProfile.data.animal.environment[env] === false) {
      result.push(env)
    }
  })

  console.log('env: ', result.toString());
  // console.log('query: ', fetchDogProfile.data.animal.photos);
  res.render('pages/dog-profile.ejs', {
    data: fetchDogProfile.data.animal,
    environment: result
  })
  // res.end()
}