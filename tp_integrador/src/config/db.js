import dotenv from "dotenv";
import { createConnection } from "mysql2/promise";

dotenv.config();

console.log(process.env.DB_PORT);

const initDB = async () => {
  const conexion = createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "test",
    port: process.env.DB_PORT || 3306,
  });
  return conexion;
};

const conexion = await initDB();

export { conexion };
