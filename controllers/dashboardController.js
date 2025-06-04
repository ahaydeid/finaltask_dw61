import db from "../model/connection.js";

export const dashboard = (req, res) => {
  // const data = await db.query("SELECT * FROM public.user");
  const userData = req.session.user; // isinya: name, email, foto
  // let userData;
  // if (req.session.user) {
  //   userData = { name: req.session.name, email: req.session.email };
  // }

  // res.render("dashboard", userData);
  res.render("dashboard", { user: userData });
};

// export const dashboard = (req, res) => {
// };
