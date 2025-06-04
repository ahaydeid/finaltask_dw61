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

// ======== ALIHKAN KE CREATE DATA ======== //
export function addProject(req, res) {
  res.render("addproject");
}

// ======== CREATE DATA ======== //
// SETUP MULTER
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/project");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
export const upload3 = multer({ storage: storage });

export const projectHandler = async (req, res) => {
  const foto = req.file ? req.file.filename : null;
  const { projectName, description, githubLink, demoLink } = req.body;
  let techstacks = req.body.techstack;
  // Ubah techstacks jadi array
  if (!Array.isArray(techstacks)) {
    techstacks = [techstacks]; // kalau cuma 1 input yang diisi
  }
  techstacks = techstacks.filter((item) => item && item.trim() !== ""); // Hapus nilai kosong supaya gak error
  const techstacksArray = `'{${techstacks.map((item) => `"${item}"`).join(",")}}'`;
  const sql = `INSERT INTO public.project (name, description, tech_use, link_github, link_demo, image) VALUES ('${projectName}', '${description}', ${techstacksArray}, '${githubLink}', '${demoLink}', '${foto}')`;
  await db.query(sql);
  // console.log({ foto, name_stack });
  res.redirect("/manageproject");
};

// ======== DELETE DATA ======== //
export const deleteProject = async (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM public.project WHERE id = ${id}`;
  await db.query(sql);
  res.redirect("/manageproject");
};
