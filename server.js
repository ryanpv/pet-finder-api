import express from "express";
import cors from "cors";
import "dotenv/config.js";
import cookieParser from "cookie-parser";
import { appAdmin } from './firebase/firebase-admin/firebase-admin-config.js';
import dogRouter from "./routes/dog-routes.js";
import catRouter from "./routes/cat-routes.js";
import { mongooseConn } from "./db/db-conn.js";
import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";
import { petApiToken } from "./middleware/pet-api-auth.js";
import { homePageController } from "./controllers/homePage.js";
import { signUpRequest } from "./controllers/firebase-controllers/sign-up-request.js";
import { loginRequest } from "./controllers/firebase-controllers/login-request.js";
import { verifyFirebaseToken } from "./middleware/verify-token.js";
import { postFavourites } from "./controllers/db-controllers/post-favourite-pets.js";
import { getFavourites } from "./controllers/db-controllers/get-user-favourites.js";
import { petProfile } from "./controllers/pet-controllers/pet-profile.js";
import { deletePet } from "./controllers/db-controllers/delete-pet.js";


const app = express();
const PORT = 3001;
const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
  uri: process.env.DB_URI,
  databaseNameName: 'connect_mongo_sessions',
  collection: 'sessions',
})


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  cookie: { maxAge: 3600 * 1000 },
  resave: false,
  store: store
}))
app.use(cookieParser());

// Check petfinder api token - acquires new one if expired/not available
app.use(petApiToken)
app.set('view engine', 'ejs');

// Routers
app.use('/dogs-for-adoption', dogRouter);
app.use('/cats-for-adoption', catRouter);

app.get('/', homePageController)
// Temp error route
app.get('/error-link', (req, res) => {
  res.send(`<p>Content not available. </p><a href='/'>back to home</a>`);
});

app.get('/clear', (req, res) => {
  if (req.session.isAuthenticated) {
    req.session.destroy();
    console.log('after destroy:', req.session);
    res.send("session destroyed")
  } else {
    res.send("no ssesion authenticated")
  }
});

// User sign up page for firebase acccount
app.get('/sign-up-page', (req, res) => {
  res.render('pages/sign-up-page.ejs', {
    reqUrl: req.originalUrl
  });
});

// Firebase sign up route
app.post('/sign-up-request', signUpRequest);

// Login page
app.get('/login', (req, res) => {
  if (req.session.userAuthenticated) {
    res.redirect('/')
  } else {
    res.render('pages/login-page.ejs', {
      reqUrl: req.originalUrl
    });
  }
});

// Login request
app.post('/login-request', loginRequest)

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.clearCookie('currentUser');

  res.send(`<p>SUCCESSFULLY LOGGED OUT!</p><a href='/'>back to home</a>`);
});

// Get pet by ID
app.get('/pet-by-id/:animalId', petProfile)

// Get user's favourited pets list
app.get('/user/favourites-list', verifyFirebaseToken, getFavourites);

// Delete user's single favourited pet
app.post('/remove-pet-request', verifyFirebaseToken, deletePet)

// Save pet to user's favourites list
app.post('/save-to-favourites', postFavourites)


app.listen(PORT, () => {
  mongooseConn
  console.log(`Connected to port: ${ PORT } successfully!`);
});