import express from "express";
import cors from "cors";
import "dotenv/config.js";
import cookieParser from "cookie-parser";
import dogRouter from "./routes/dog-routes.js";
import catRouter from "./routes/cat-routes.js";
import { mongooseConn } from "./db/db-conn.js";
import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";
import { petApiToken } from "./middleware/pet-api-auth.js";
import { homePageController } from "./controllers/homePage.js";


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
app.use(petApiToken)
app.set('view engine', 'ejs');



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
})


app.listen(PORT, () => {
  mongooseConn
  console.log(`Connected to port: ${ PORT } successfully!`);
});