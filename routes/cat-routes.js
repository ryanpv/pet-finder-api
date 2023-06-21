import express from "express";
import { petData } from "../controllers/dog-controllers/pet-data.js";
import { paginate } from "../controllers/dog-controllers/dog-pagination.js";
import { petProfile } from "../controllers/dog-controllers/pet-profile.js";

const catRouter = express.Router();

// Homepage for CAT route
catRouter.route('/')
  .get(petData)
  .post(petData)

// Pagination Route for cats
catRouter.route('/all-cats')
  .post(paginate)

// Direct page request through params
catRouter.route('/all-cats/page/:pageNumber')
  .get(petData)

// Query for single cat profile
catRouter.route('/cat-by-id/:animalId')
  .get(petProfile);

// Query for pet by name
catRouter.route('/search-by-name')
  .post(petData);


export default catRouter; 