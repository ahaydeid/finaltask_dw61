import db from "../model/connection.js";
import multer from "multer";
import path from "path";

// ======== READ DATA ======== //
export const manageExperience = async (req, res) => {
  const result = await db.query("SELECT * FROM experience ORDER BY id DESC");
  const data = result.rows.map((item) => ({
    ...item,
    tech_use: item.tech_use || [],
    jobdesc: item.jobdesc || [], // jaga-jaga kalau null
    start_date_formatted: new Date(item.start_date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    }),
    end_date_formatted: new Date(item.end_date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    }),
  }));
  res.render("manageexperience", { hasilexperience: data });
};

// ======== ALIHKAN KE CREATE DATA ======== //
export const addExperience = async (req, res) => {
  res.render("addexperience");
};

// ======== CREATE DATA ======== //
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/experience");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
export const upload2 = multer({ storage: storage });

export const experienceHandler = async (req, res) => {
  const foto = req.file ? req.file.filename : null;
  const { tittle, company, startDate, endDate } = req.body;
  let jobdescs = req.body.jobdesc;
  // Ubah jobdescs jadi array
  if (!Array.isArray(jobdescs)) {
    jobdescs = [jobdescs]; // kalau cuma 1 input yang diisi
  }
  jobdescs = jobdescs.filter((item) => item && item.trim() !== ""); // Hapus nilai kosong supaya gak error
  const jobdescsArray = `'{${jobdescs.map((item) => `"${item}"`).join(",")}}'`;

  let techstacks = req.body.techstack;
  // Ubah techstacks jadi array
  if (!Array.isArray(techstacks)) {
    techstacks = [techstacks]; // kalau cuma 1 input yang diisi
  }
  techstacks = techstacks.filter((item) => item && item.trim() !== ""); // Hapus nilai kosong supaya gak error
  const techstacksArray = `'{${techstacks.map((item) => `"${item}"`).join(",")}}'`;
  const sql = `INSERT INTO public.experience (tittle, company, jobdesc, tech_use, start_date, end_date, image) VALUES ('${tittle}', '${company}', ${jobdescsArray}, ${techstacksArray}, '${startDate}', '${endDate}', '${foto}')`;
  await db.query(sql);
  // console.log({ foto, name_stack });
  res.redirect("/manageexperience");
};

// ========DELETE DATA ======== //
export const deleteExperience = async (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM public.experience WHERE id = ${id}`;
  await db.query(sql);
  res.redirect("/manageexperience");
};
