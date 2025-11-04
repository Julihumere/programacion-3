import { conexion } from "./db.js";

export default class Turnos {
  buscarTodos = async () => {
    const sql = "SELECT * FROM turnos WHERE activo = 1";
    const [turnos] = await conexion.execute(sql);

    if (turnos.length === 0) return null;

    return turnos;
  };

  buscarPorId = async (turno_id) => {
    const sql = "SELECT * FROM turnos WHERE turno_id = ? AND activo = 1";
    const [turno] = await conexion.execute(sql, [turno_id]);

    if (turno.length === 0) return null;

    return turno[0];
  };

  crear = async (turno) => {
    const sql =
      "INSERT INTO turnos (orden, hora_desde, hora_hasta, activo) VALUES (?, ?, ?, ?)";
    const params = [
      turno.orden,
      turno.hora_desde,
      turno.hora_hasta,
      turno.activo ?? 1,
    ];
    const [result] = await conexion.execute(sql, params);
    if (result.affectedRows === undefined) return null;
    return result;
  };

  actualizar = async (id, turno) => {
    const campos = Object.keys(turno);
    const valores = Object.values(turno);

    const setValores = campos.map((campo) => `${campo} = ?`).join(", ");
    const parametros = [...valores, Number(id)];

    const sql = `UPDATE turnos SET ${setValores} WHERE turno_id = ?`;

    const [result] = await conexion.execute(sql, parametros);

    if (result.affectedRows === 0) return null;

    return this.buscarPorId(id);
  };

  eliminar = async (id) => {
    const sql = "UPDATE turnos SET activo = 0 WHERE turno_id = ?";
    const [result] = await conexion.execute(sql, [id]);

    if (result.affectedRows === 0) return null;

    return result;
  };
}
