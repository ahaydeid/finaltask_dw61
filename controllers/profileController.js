import db from "../model/connection.js";
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";

export function registerProfile(req, res) {
  res.render("register");
}

// ======== CREATE DATA ======== //
// SETUP MULTER
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profilephoto");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
export const upload4 = multer({ storage: storage });

export const registerProfileHandler = async (req, res) => {
  const foto = req.file ? req.file.filename : null;
  const { name, email, password, confirmPassword } = req.body;
  const isRegistered = await db.query(`SELECT * FROM public.user WHERE email='${email}'`);
  if (isRegistered.rowCount > 0) {
    req.flash("error", "Email sudah terdaftar");
    return res.redirect("/register");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  if (password !== confirmPassword) {
    console.log("Password dan confirmnya beda");
    return res.send("Password dan konfirmasi gak sama, bro. 😒");
  }
  try {
    const sql = `INSERT INTO public.user (name, email, password, foto) VALUES ('${name}', '${email}', '${hashedPassword}', '${foto}')`;
    await db.query(sql);
    res.redirect("/login");
  } catch (error) {
    console.error("Gagal insert ke database:", error);
    res.send("Ada kesalahan");
  }
};

// ======== ALIHKAN KE HALAMAN UPDATE ======== //
export const editProfile = async (req, res) => {
  res.render("editprofile");
};

// ======== UPDATE DATA ======== //
export const submitEditProfile = async (req, res) => {
  //   res.render("editprofile");
};

// export const updateStack = async (req, res) => {
//   const foto = req.file ? req.file.filename : null;
//   const { id, name_stack } = req.body;

//   let sql = "";
//   if (req.file) {
//     const foto = req.file.filename;
//     sql = `UPDATE techstack SET icon_tech = '${foto}', name_tech = '${name_stack}' WHERE id='${id}'`;
//   } else {
//     sql = `UPDATE techstack SET name_tech = '${name_stack}' WHERE id='${id}'`;
//   }
//   await db.query(sql);
//   // console.log({ foto, name_stack });
//   res.redirect("/managestack");
// };

export const profile = async (req, res) => {
  const userData = req.session.user; // isinya: id, name, email, foto
  const userID = req.session.user.userId; // Spesifik untuk mengambil id nya user agar value integer (bukan object)
  const dataStack = await db.query(`SELECT * FROM techstack WHERE user_id = '${userID}'`);
  const dataExperience = await db.query(`SELECT * FROM experience WHERE user_id = '${userID}'`);
  const dataProject = await db.query(`SELECT * FROM project WHERE user_id = '${userID}'`);
  // res.render("profile", userData);
  res.render("profile", {
    user: userData,
    stack: dataStack.rows.length,
    experience: dataExperience.rows.length,
    project: dataProject.rows.length,
  });
};
