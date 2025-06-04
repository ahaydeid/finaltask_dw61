import db from "../model/connection.js";

export const dashboard = (req, res) => {
  // const data = await db.query("SELECT * FROM public.user");
  const userData = req.session.user; // isinya: name, email, foto

  // res.render("dashboard", userData);
  res.render("dashboard", { user: userData });
};
