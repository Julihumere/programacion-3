import { conexion } from "../config/db.js";

const crearServicio = async (servicio) => {
  const { descripcion, importe, activo } = servicio;

  const sql =
    "INSERT INTO servicios (descripcion, importe, activo) VALUES (?, ?, ?)";
  const params = [descripcion, importe, activo];

  const [result] = await conexion.execute(sql, params);

  if (result.affectedRows === undefined) {
    throw new Error("No se pudo crear el servicio");
  }

  return result;
};

const listarServicios = async () => {
  const [rows] = await conexion.execute("SELECT * FROM servicios");
  return rows;
};

const obtenerServicio = async (id) => {
  const [rows] = await conexion.execute(
    "SELECT * FROM servicios WHERE servicio_id = ?",
    [Number(id)]
  );
  return rows[0];
};

const actualizarServicio = async (id, servicio) => {
  const { descripcion, importe, activo } = servicio;

  const sql =
    "UPDATE servicios SET descripcion = ?, importe = ?, activo = ?, modificado = NOW() WHERE servicio_id = ?";
  const params = [descripcion, importe, activo, Number(id)];

  const [result] = await conexion.execute(sql, params);

  if (result.affectedRows === 0) {
    throw new Error("Servicio no encontrado o no se pudo actualizar");
  }

  return result;
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
