import express from "express";
import { petData } from "../controllers/dog-controllers/pet-data.js";
import { paginate } from "../controllers/dog-controllers/dog-pagination.js";
import { petProfile } from "../controllers/dog-controllers/pet-profile.js";

const dogRouter = express.Router();

// Homepage for DOG route
dogRouter.route('/')
  .get(petData) // Home page for dogs for adoptin
  .post(petData) // Post to home for breeds filters retrieval 

// Pagination route
dogRouter.route('/all-dogs')
  .post(paginate)

// Route for querying page through params
dogRouter.route('/all-dogs/page/:pageNumber')
  .get(petData)

// Query for single dog profile
dogRouter.route('/dog-by-id/:animalId')
  .get(petProfile)

// Querying dogs by name
dogRouter.route('/search-by-name')
  .post(petData)

export default dogRouter;