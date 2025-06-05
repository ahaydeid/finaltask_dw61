import db from "../model/connection.js";
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";

export function register(req, res) {
  res.render("register", { message: req.flash("error") });
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

export const registerHandler = async (req, res) => {
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

// ======== UPDATE DATA ======== //
export const editProfile = async (req, res) => {
  res.render("editprofile");
};

export const updateStack = async (req, res) => {
  const foto = req.file ? req.file.filename : null;
  const { id, name_stack } = req.body;

  let sql = "";
  if (req.file) {
    const foto = req.file.filename;
    sql = `UPDATE techstack SET icon_tech = '${foto}', name_tech = '${name_stack}' WHERE id='${id}'`;
  } else {
    sql = `UPDATE techstack SET name_tech = '${name_stack}' WHERE id='${id}'`;
  }
  await db.query(sql);
  // console.log({ foto, name_stack });
  res.redirect("/managestack");
};
