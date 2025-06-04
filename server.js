import express from "express";
const app = express();
const port = 3000;
import hbs from "hbs";
import router from "./routes/route.js";
import flash from "express-flash";
import session from "express-session";

app.set("view engine", "hbs");
app.set("views", "src/views");
app.use(express.json()); // untuk parsing JSON
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secretKey",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(router);
app.use("/assets", express.static("src/assets"));
app.use("/uploads", express.static("uploads"));
//membuat nomor index menjadi increment
hbs.registerHelper("increment", (index) => index + 1);
hbs.registerPartials("src/views/partials");

app.listen(port, () => {
  console.log(`App running on port ${port}`);
  console.log(`http://localhost:3000/addproject`);
});
