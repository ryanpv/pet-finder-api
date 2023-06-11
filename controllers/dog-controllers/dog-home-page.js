import axios from "axios";
import { getAllDogs } from "./get-all-dogs.js";

export const dogPage = async (req, res) => {
  const fetchedDogs = await getAllDogs(req, res)
  res.render('pages/dog-page.ejs', {
    data: fetchedDogs.data.animals
  })
}