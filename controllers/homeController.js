import db from "../model/connection.js";

// export const home = async (req, res) => {
//   const data = await db.query(`SELECT * FROM public.techstack ORDER BY id ASC `);
//   res.render("index", { hasil: data.rows });
// };

export const home = async (req, res) => {
  try {
    const techData = await db.query(`SELECT * FROM public.techstack ORDER BY id ASC`);
    const expResult = await db.query("SELECT * FROM experience ORDER BY id DESC");
    const proResult = await db.query("SELECT * FROM project ORDER BY id DESC");

    const experienceData = expResult.rows.map((item) => ({
      ...item,
      tech_use: item.tech_use || [],
      jobdesc: item.jobdesc || [],
      start_date_formatted: new Date(item.start_date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      end_date_formatted: new Date(item.end_date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
    }));

    const projectData = proResult.rows.map((item) => ({
      ...item,
      tech_use: item.tech_use || [], // jaga-jaga kalau null
    }));

    res.render("index", {
      hasil: techData.rows, // untuk tabel techstack
      hasilexperience: experienceData, // untuk tabel experience
      hasilproject: projectData, // untuk tabel project
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error, Duh 😢");
  }
};
