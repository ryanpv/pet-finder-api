import express from "express";
import { dogPage } from "../controllers/dog-controllers/dog-home-page.js";
import { pageinate } from "../controllers/dog-controllers/dog-pagination.js";
import { dogProfile } from "../controllers/dog-controllers/dog-profile.js";
import NodeCache from "node-cache";
const cache = new NodeCache();


const dogRouter = express.Router();
// dogRouter.use(petApiToken)

// Homepage route
dogRouter.route('/')
  .get(dogPage) // Home page for dogs for adoptin
  .post(dogPage) // Post to home for breeds filters retrieval 

// dogRouter.route('/all-dogs')
//   .get(dogPage)

// Pagination route
dogRouter.route('/all-dogs')
  .post(pageinate)

// Route for querying page through params
dogRouter.route('/all-dogs/:pageNumber')
  .get(dogPage)

// Query for single dog profile
dogRouter.route('/dog/:animalId')
  .get(dogProfile)

// Querying dogs by name
dogRouter.route('/search-by-name')
  .post(dogPage)

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