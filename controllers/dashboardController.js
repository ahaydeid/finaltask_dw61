import db from "../model/connection.js";

export const dashboard = async (req, res) => {
  const userData = req.session.user; // isinya: name, email, foto
  const dataStack = await db.query("SELECT * FROM techstack");
  const dataExperience = await db.query("SELECT * FROM experience");
  const dataProject = await db.query("SELECT * FROM project");

  // res.render("dashboard", userData);
  res.render("dashboard", {
    user: userData,
    stack: dataStack.rows.length,
    experience: dataExperience.rows.length,
    project: dataProject.rows.length,
  });
};
