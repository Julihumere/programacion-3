import { createConnection } from "mysql2/promise";
process.loadEnvFile();

const initDB = async () => {
  const scriptInit = `
  GRANT DELETE ON casa_cumpleanos.* TO 'reservas'@'%';
GRANT INSERT ON casa_cumpleanos.* TO 'reservas'@'%';
GRANT SELECT ON casa_cumpleanos.* TO 'reservas'@'%';
GRANT UPDATE ON casa_cumpleanos.* TO 'reservas'@'%';
  `;

  const conexion = createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  return conexion;
};

const conexion = await initDB();

export { conexion };
