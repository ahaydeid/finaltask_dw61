import express from "express";
const app = express();
const port = 3000;
import hbs from "hbs";
import path from "path";

app.set("view engine", "hbs");
app.use("/assets", express.static("src/assets"));

app.set("views", "src/views");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
