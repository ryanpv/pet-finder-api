import express from "express";
import { dogPage } from "../controllers/dog-controllers/dog-home-page.js";
import { pageinate } from "../controllers/dog-controllers/dog-pagination.js";
import { dogProfile } from "../controllers/dog-controllers/dog-profile.js";

const dogRouter = express.Router();
// dogRouter.use(petApiToken)

dogRouter.route('/')
  .get(dogPage)

// dogRouter.route('/all-dogs')
//   .get(dogPage)

dogRouter.route('/all-dogs')
  .post(pageinate)

dogRouter.route('/all-dogs/:pageNumber')
  .get(dogPage)

dogRouter.route('/dog/:animalId')
  .get(dogProfile)

dogRouter.route('/search-by-name')
  .post(dogPage)

export default dogRouter;