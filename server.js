import express from "express";
const app = express();
const port = 3000;
import hbs from "hbs";
import path from "path";

app.set("view engine", "hbs");
app.set("views", "src/views");
hbs.registerPartials("src/views/partials");

app.use("/assets", express.static("src/assets"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

// Sementara untuk keperluan desain UI nya dulu
app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
