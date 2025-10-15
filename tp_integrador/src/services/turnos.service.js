import { conexion } from "../config/db.js";

const crearTurno = async (turno) => {
  const { orden, hora_desde, hora_hasta, activo } = turno;

  const sql =
    "INSERT INTO turnos (orden, hora_desde, hora_hasta, activo) VALUES (?, ?, ?, ?)";
  const params = [orden, hora_desde, hora_hasta, activo];

  const [result] = await conexion.execute(sql, params);

  if (result.affectedRows === undefined) {
    throw new Error("No se pudo crear el turno");
  }

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
  const { orden, hora_desde, hora_hasta, activo } = turno;

  const sql =
    "UPDATE turnos SET orden = ?, hora_desde = ?, hora_hasta = ?, activo = ?, modificado = NOW() WHERE turno_id = ?";
  const params = [orden, hora_desde, hora_hasta, activo, Number(id)];

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
