import { conexion } from "../db/db.js";

export default class Servicios {
  buscarTodos = async () => {
    const sql = "SELECT * FROM servicios WHERE activo = 1";
    const [servicios] = await conexion.execute(sql);

    if (servicios.length === 0) return null;

    return servicios;
  };

  buscarPorId = async (id) => {
    const sql = "SELECT * FROM servicios WHERE servicio_id = ? AND activo = 1";

    const [servicio] = await conexion.execute(sql, [id]);

    if (servicio.length === 0) return null;

    return servicio[0];
  };

  crear = async (servicio) => {
    const sql =
      "INSERT INTO servicios (descripcion, importe, activo) VALUES (?, ?, ?)";
    const params = [
      servicio.descripcion,
      servicio.importe,
      servicio.activo ?? 1,
    ];

    const [result] = await conexion.execute(sql, params);

    if (result.affectedRows === undefined) return null;

    return result;
  };

  actualizar = async (id, servicio) => {
    const campos = Object.keys(servicio);
    const valores = Object.values(servicio);

    const setValores = campos.map((campo) => `${campo} = ?`).join(", ");
    const parametros = [...valores, Number(id)];

    const sql = `UPDATE servicios SET ${setValores} WHERE servicio_id = ?`;

    const [result] = await conexion.execute(sql, parametros);

    if (result.affectedRows === 0) return null;

    return this.buscarPorId(id);
  };

  eliminar = async (id) => {
    const sql = "UPDATE servicios SET activo = 0 WHERE servicio_id = ?";
    const [result] = await conexion.execute(sql, [id]);

    if (result.affectedRows === 0) return null;

    return result;
  };
}
