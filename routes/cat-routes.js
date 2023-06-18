import express from "express";
import { petData } from "../controllers/dog-controllers/pet-data.js";
import { paginate } from "../controllers/dog-controllers/dog-pagination.js";
import { petProfile } from "../controllers/dog-controllers/pet-profile.js";

const catRouter = express.Router();

// Homepage for CAT route
catRouter.route('/')
  .get(petData)

catRouter.route('/error-link')
  .get((req, res) => {
    res.send(`<p>Content not available. </p><a href='/'>back to home</a>`);
  })

// Pagination Route for cats
catRouter.route('/all-cats')
  .post(paginate)


catRouter.route('/all-cats/page/:pageNumber')
  .get(petData)

// Query for single cat profile
catRouter.route('/cat-by-id/:animalId')
  .get(petProfile);





export default catRouter; 