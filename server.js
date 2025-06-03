import express from "express";
const app = express();
const port = 3000;
import hbs from "hbs";
import path from "path";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
import router from "./routes/route.js";

//membuat nomor index menjadi increment
hbs.registerHelper("increment", (index) => index + 1);

app.set("view engine", "hbs");
app.set("views", "src/views");
hbs.registerPartials("src/views/partials");
app.use(express.json()); // untuk parsing JSON
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use("/assets", express.static("src/assets"));
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
