import { Pool } from "pg";

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "final_project",
  password: "ahadiPOSTGRES",
  port: 5432,
});

export default db;
