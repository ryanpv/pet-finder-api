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

    console.log('body: ', body);
    const savePetData = new Pets(body)
    const checkDuplicateSaves = await Pets.exists({ userId: req.session.userId, petId: req.body.petId });
  console.log('dupe: ', checkDuplicateSaves);
    
    if (checkDuplicateSaves === null) {
      const saveData = await savePetData.save();
      console.log('save data: ', saveData);
      res.end()
    } else {
      res.send({ message: "Already saved to favourites." });
    }
  } catch (error) {
    console.log(error);
    res.end()
    
  }
}