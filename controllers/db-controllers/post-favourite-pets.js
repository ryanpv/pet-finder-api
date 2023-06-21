import { Pets } from "../../db/db-conn.js";

export const postFavourites = async (req, res) => {
  try {
    const body = {
      userId: req.session.userId,
      petType: req.body.petType,
      petName: req.body.petName,
      petId: req.body.petId,
      petPhotoSrc: req.body.petPhotoSrc,
    };

    const savePetData = new Pets(body)
    const checkDuplicateSaves = await Pets.exists({ userId: req.session.userId, petId: req.body.petId });
    
    if (checkDuplicateSaves === null) {
      const saveData = await savePetData.save();
      console.log('save data: ', saveData);
      
      // Redirect back to same page since form directs to the POST route
      res.redirect('back');
    } else {
      res.send({ message: "Already saved to favourites." });
    }
  } catch (error) {
    console.log(error);
    res.end()
  }
}