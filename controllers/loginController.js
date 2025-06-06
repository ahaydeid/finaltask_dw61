import db from "../model/connection.js";
import bcrypt from "bcrypt";

export function login(req, res) {
  res.render("login", { message: req.flash("error") });
}

export function logout(req, res) {
  req.session.destroy(() => {
    res.redirect("/login");
  });
}

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const isRegistered = await db.query(`SELECT * FROM public.users WHERE email='${email}'`);
  const isMatch = await bcrypt.compare(password, isRegistered.rows[0].password);
  if (!isMatch) {
    req.flash("error", "password salah");
    return res.redirect("/login");
  }
  // Ketika berhasil login, maka akan membuat session yang berisi informasi dibawah ini, isi informasinya bisa disesuaikan berdasarkan kebutuhan
  req.session.user = {
    userId: isRegistered.rows[0].id,
    name: isRegistered.rows[0].name,
    email: isRegistered.rows[0].email,
    foto: isRegistered.rows[0].foto,
    title: isRegistered.rows[0].title,
    description: isRegistered.rows[0].description,
    location: isRegistered.rows[0].location,
    contact: isRegistered.rows[0].contact,
    cv: isRegistered.rows[0].cv,
  };
  res.redirect("/profile");
};
