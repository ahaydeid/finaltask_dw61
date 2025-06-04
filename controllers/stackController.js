import db from "../model/connection.js";
import multer from "multer";

export const manageStack = async (req, res) => {
  const data = await db.query("SELECT * FROM techstack ORDER BY id DESC");
  res.render("managestack", { hasil: data.rows });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, "uploads/stack");
    cb(null, "src/assets/tech");
  },
  filename: function (req, file, cb) {
    // cb(null, Date.now() + path.extname(file.originalname));
    cb(null, file.originalname);
  },
});
export const upload = multer({ storage: storage });

export const stackHandler = async (req, res) => {
  const foto = req.file ? req.file.filename : null;
  const name_stack = req.body.name_stack;
  const sql = `INSERT INTO techstack (icon_tech, name_tech) VALUES ('${foto}', '${name_stack}')`;
  await db.query(sql);
  // console.log({ foto, name_stack });
  res.redirect("/managestack");
};

export const editStack = async (req, res) => {
  const id = req.params.id;
  const data = await db.query(`SELECT * FROM techstack WHERE id='${id}'`);
  // console.log(data);

  res.render("editstack", { hasil: data.rows[0] });
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

export const deleteStack = async (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM public.techstack WHERE id = ${id}`;
  await db.query(sql);
  res.redirect("/managestack");
};
