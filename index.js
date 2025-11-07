import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://www.omdbapi.com/?apikey=9772a00&t=";

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "null" });
});

app.post("/find", async (req, res) => {
  try {
    const movieName = encodeURIComponent(req.body.movieName.trim());
    const result = await axios.get(API_URL + movieName);
    res.render("index2.ejs", {
      content: JSON.stringify(result.data, null, 2),
    });
  } catch (error) {
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
