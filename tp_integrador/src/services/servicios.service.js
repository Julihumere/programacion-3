import { conexion } from "../config/db.js";
import { validarServicioBody } from "../utils/validador.js";
import { enviarNotificacion } from "../utils/envioNotificacion.js";

const crearServicio = async (servicio) => {
  const { descripcion, importe, activo } = servicio;

  const validacion = validarServicioBody(servicio);
  if (!validacion.ok) {
    throw new Error(validacion.message);
  }

  const sql =
    "INSERT INTO servicios (descripcion, importe, activo) VALUES (?, ?, ?)";
  const params = [descripcion, importe, activo];

  const [result] = await conexion.execute(sql, params);

  if (result.affectedRows === undefined) {
    throw new Error("No se pudo crear el servicio");
  }

  await enviarNotificacion(
    {
      titulo: `Nuevo Servicio: ${descripcion}`,
      descripcion: descripcion,
      importe: importe,
      destinatario: process.env.EMAIL_DESTINATARIO,
    },
    2
  );

  return result;
};
const actualizarServicio = async (id, servicio) => {
  const existeServicio = await obtenerServicio(id);
  if (!existeServicio) return null;

  const validacion = validarServicioBody(servicio, true, existeServicio);
  if (!validacion.ok) {
    throw new Error(validacion.message);
  }

  let sql = "";

  const keys = Object.keys(servicio);
  const values = Object.values(servicio);

  const setValues = keys.map((key) => `${key} = ?`).join(", ");
  const params = [...values, Number(id)];

  sql = `UPDATE servicios SET ${setValues} WHERE servicio_id = ?`;

  const [result] = await conexion.execute(sql, params);

  if (result.affectedRows === 0) {
    throw new Error("Servicio no encontrado o no se pudo actualizar");
  }

  return result;
};

const listarServicios = async () => {
  const [rows] = await conexion.execute(
    "SELECT * FROM servicios WHERE activo = 1 ORDER BY descripcion"
  );
  return rows;
};

const obtenerServicio = async (id) => {
  const [rows] = await conexion.execute(
    "SELECT * FROM servicios WHERE servicio_id = ?",
    [Number(id)]
  );
  return rows[0];
};

const eliminarServicio = async (id) => {
  const sql =
    "UPDATE servicios SET activo = 0, modificado = NOW() WHERE servicio_id = ?";
  const params = [Number(id)];

  const [result] = await conexion.execute(sql, params);

  if (result.affectedRows === 0) {
    throw new Error("Servicio no encontrado o no se pudo eliminar");
  }

  return result;
};

export {
  crearServicio,
  listarServicios,
  obtenerServicio,
  actualizarServicio,
  eliminarServicio,
};
