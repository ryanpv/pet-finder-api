import express from "express";
import axios from "axios";
import { getAllDogs } from "../controllers/dog-controllers/get-all-dogs.js";
import { petApiToken } from "../middleware/pet-api-auth.js";
import { dogPage } from "../controllers/dog-controllers/dog-home-page.js";

const dogRouter = express.Router();
// dogRouter.use(petApiToken)

dogRouter.route('/')
  .get(dogPage)

dogRouter.route('/all-dogs')
  .get(dogPage)


export default dogRouter;