import db from "../model/connection.js";

export const manageStack = async (req, res) => {
  const data = await db.query("SELECT * FROM techstack ORDER BY id ASC");
  res.render("manageStack", { hasil: data.rows });
};

export const stackHandler = async (req, res) => {
  const foto = req.file ? req.file.filename : null;
  const name_stack = req.body.name_stack;
  const sql = `INSERT INTO techstack (icon_tech, name_tech) VALUES ('${foto}', '${name_stack}')`;

  await db.query(sql);
  // console.log({ foto, name_stack });
  res.redirect("/managestack");
};
