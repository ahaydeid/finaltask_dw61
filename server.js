import express from "express";
const app = express();
const port = 3000;
import hbs from "hbs";
import router from "./routes/route.js";
import path from "path";

app.set("view engine", "hbs");
app.set("views", "src/views");
hbs.registerPartials("src/views/partials");

app.use(router);
app.use("/assets", express.static("src/assets"));

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
