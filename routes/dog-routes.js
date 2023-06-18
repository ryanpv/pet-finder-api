import express from "express";
import { petData } from "../controllers/dog-controllers/pet-data.js";
import { paginate } from "../controllers/dog-controllers/dog-pagination.js";
import { petProfile } from "../controllers/dog-controllers/pet-profile.js";
import NodeCache from "node-cache";
const cache = new NodeCache();


const dogRouter = express.Router();
// dogRouter.use(petApiToken)

// Homepage for DOG route
dogRouter.route('/')
  .get(petData) // Home page for dogs for adoptin
  .post(petData) // Post to home for breeds filters retrieval 

// dogRouter.route('/all-dogs')
//   .get(dogPage)

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

// Dev route for clearing cache - not for Prod
dogRouter.route('/del-cache')
  .get((req, res) => {
    cache.del('breedKey')
    console.log('successfully deleted cache');
    res.redirect('/');
  })

dogRouter.route('/filtered')
  .post((req, res) => {
    // console.log('req.: ', req.body);
    res.end()
  })

export default dogRouter;