import db from "../model/connection.js";
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";

export function register(req, res) {
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

export const registerHandler = async (req, res) => {
  const foto = req.file ? req.file.filename : null;
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    console.log("Password dan confirmnya beda");
    return res.status(400).send("Password dan konfirmasi tidak sama");
  }
  try {
    const sql = `INSERT INTO public.user (name, email, password, foto) VALUES ('${name}', '${email}', '${password}', '${foto}')`;
    await db.query(sql);
    res.redirect("/login");
  } catch (error) {
    console.error("Gagal insert ke database:", error);
    res.status(500).send("Terjadi kesalahan saat mendaftar");
  }
};
