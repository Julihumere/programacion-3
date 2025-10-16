import { conexion } from "../config/db.js";
import { validarTurnoBody } from "../utils/validador.js";
import { enviarNotificacion } from "../utils/envioNotificacion.js";

const crearTurno = async (turno) => {
  const { orden, hora_desde, hora_hasta, activo } = turno;

  const validacion = validarTurnoBody(turno);
  if (!validacion.ok) {
    throw new Error(validacion.message);
  }

  const sql =
    "INSERT INTO turnos (orden, hora_desde, hora_hasta, activo) VALUES (?, ?, ?, ?)";
  const params = [orden, hora_desde, hora_hasta, activo];

  const [result] = await conexion.execute(sql, params);

  if (result.affectedRows === undefined) {
    throw new Error("No se pudo crear el turno");
  }

  await enviarNotificacion(
    {
      titulo: `Nuevo Turno: ${orden}`,
      orden: orden,
      hora_desde: hora_desde,
      hora_hasta: hora_hasta,
      destinatario: process.env.EMAIL_DESTINATARIO,
    },
    3
  );

  return result;
};

const listarTurnos = async () => {
  const [rows] = await conexion.execute("SELECT * FROM turnos ORDER BY orden");
  return rows;
};

const obtenerTurno = async (id) => {
  const [rows] = await conexion.execute(
    "SELECT * FROM turnos WHERE turno_id = ?",
    [Number(id)]
  );
  return rows[0];
};

const actualizarTurno = async (id, turno) => {
  const existeTurno = await obtenerTurno(id);
  if (!existeTurno) return null;

  const validacion = validarTurnoBody(turno, true, existeTurno);
  if (!validacion.ok) {
    throw new Error(validacion.message);
  }

  let sql = "";
  const keys = Object.keys(turno);
  const values = Object.values(turno);
  const setValues = keys.map((key) => `${key} = ?`).join(", ");
  const params = [...values, Number(id)];
  sql = `UPDATE turnos SET ${setValues} WHERE turno_id = ?`;

  const [result] = await conexion.execute(sql, params);

  if (result.affectedRows === 0) {
    throw new Error("Turno no encontrado o no se pudo actualizar");
  }

  return result;
};

const eliminarTurno = async (id) => {
  const sql =
    "UPDATE turnos SET activo = 0, modificado = NOW() WHERE turno_id = ?";
  const params = [Number(id)];

  const [result] = await conexion.execute(sql, params);

  if (result.affectedRows === 0) {
    throw new Error("Turno no encontrado o no se pudo eliminar");
  }

  return result;
};

export {
  crearTurno,
  listarTurnos,
  obtenerTurno,
  actualizarTurno,
  eliminarTurno,
};
