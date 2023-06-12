import axios from "axios";

export const dogProfile = async (req, res) => {
  const headers = {
    "Content-type": "application/x-www-form-urlencoded",
    "Authorization": `Bearer ${ req.session.accessToken }`
  }
  const fetchDogProfile = await axios.get(`https://api.petfinder.com/v2/animals/${ req.params.animalId }`, { headers: headers })

  console.log('query: ', fetchDogProfile.data.animal.photos);
  res.render('pages/dog-profile.ejs', {
    data: fetchDogProfile.data.animal
  })
  // res.end()
}