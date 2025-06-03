import db from "../model/connection.js";

export const home = async (req, res) => {
  const data = await db.query(`SELECT * FROM public.techstack ORDER BY id ASC `);
  res.render("index", { hasil: data.rows });
};
