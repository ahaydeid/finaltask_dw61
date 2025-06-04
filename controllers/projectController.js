import db from "../model/connection.js";
import multer from "multer";
import path from "path";

export const manageProject = async (req, res) => {
  const result = await db.query("SELECT * FROM project ORDER BY id DESC");
  const data = result.rows.map((item) => ({
    ...item,
    tech_use: item.tech_use || [], // jaga-jaga kalau null
  }));
  res.render("manageproject", { hasilproject: data });
};

export function addProject(req, res) {
  res.render("addproject");
}

export const deleteProject = async (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM public.project WHERE id = ${id}`;
  await db.query(sql);
  res.redirect("/manageproject");
};
