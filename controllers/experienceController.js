import db from "../model/connection.js";

export const manageExperience = async (req, res) => {
  const data = await db.query("SELECT * FROM experience ORDER BY id DESC");
  res.render("manageexperience", { hasil: data.rows });
};

export function addExperience(req, res) {
  res.render("addexperience");
}
