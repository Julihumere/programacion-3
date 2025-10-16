import { conexion } from "../config/db.js";
import { enviarNotificacion } from "../utils/envioNotificacion.js";
import { validarSalonBody } from "../utils/validador.js";

const crearSalon = async (salon) => {
  const { titulo, direccion, latitud, longitud, capacidad, importe, activo } =
    salon;

  const sql =
    "INSERT INTO salones (titulo, direccion, latitud, longitud, capacidad, importe, activo) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const params = [
    titulo,
    direccion,
    latitud || null,
    longitud || null,
    capacidad,
    importe,
    activo,
  ];

  const [result] = await conexion.execute(sql, params);

  if (result.affectedRows === undefined) {
    throw new Error("No se pudo crear el salon");
  }

  await enviarNotificacion(
    {
      titulo: `Nuevo Salón de Fiestas: ${titulo}`,
      direccion: direccion,
      latitud: latitud,
      longitud: longitud,
      capacidad: capacidad,
      importe: importe,
      destinatario: process.env.EMAIL_DESTINATARIO,
    },
    1
  );

  return result;
};

const listarSalones = async () => {
  const [rows] = await conexion.execute("SELECT * FROM salones");
  return rows;
};

const obtenerSalon = async (id) => {
  const [rows] = await conexion.execute(
    "SELECT * FROM salones WHERE salon_id = ?",
    [Number(id)]
  );
  return rows[0];
};

const actualizarSalon = async (id, salon) => {
  const existeSalon = await obtenerSalon(id);
  if (!existeSalon) return null;

  const validacion = validarSalonBody(salon, true, existeSalon);
  if (!validacion.ok) {
    throw new Error(validacion.message);
  }

  let sql = "";

  const keys = Object.keys(salon);
  const values = Object.values(salon);

  const setValues = keys.map((key) => `${key} = ?`).join(", ");
  const params = [...values, Number(id)];

  sql = `UPDATE salones SET ${setValues} WHERE salon_id = ?`;

  const [result] = await conexion.execute(sql, params);

  if (result.affectedRows === 0) {
    throw new Error("Salon no encontrado o no se pudo actualizar");
  }

  return result;
};

const eliminarSalon = async (id) => {
  const sql =
    "UPDATE salones SET activo = 0, modificado = NOW() WHERE salon_id = ?";
  const params = [Number(id)];

  const [result] = await conexion.execute(sql, params);

  if (result.affectedRows === 0) {
    throw new Error("Salon no encontrado o no se pudo eliminar");
  }

  return result;
};

export {
  crearSalon,
  listarSalones,
  obtenerSalon,
  actualizarSalon,
  eliminarSalon,
};
