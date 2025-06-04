import db from "../model/connection.js";

export const dashboard = async (req, res) => {
  const data = await db.query("SELECT * FROM public.user WHERE id=4");
  res.render("dashboard", { hasil: data.rows[0] });
};
