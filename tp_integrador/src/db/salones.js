import { conexion } from "./db.js";

export default class Salones {
  buscarTodos = async () => {
    const sql = "SELECT * FROM salones WHERE activo = 1";
    const [salones] = await conexion.execute(sql);

    if (salones.length === 0) return null;

    return salones;
  };

  buscarPorId = async (salon_id) => {
    const sql = "SELECT * FROM salones WHERE salon_id = ? AND activo = 1";
    const [salon] = await conexion.execute(sql, [salon_id]);

    if (salon.length === 0) return null;

    return salon[0];
  };

  crear = async (salon) => {
    const sql =
      "INSERT INTO salones (titulo, direccion, latitud, longitud, capacidad, importe, activo) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const params = [
      salon.titulo,
      salon.direccion,
      salon.latitud,
      salon.longitud,
      salon.capacidad,
      salon.importe,
      salon.activo ?? 1,
    ];
    const [result] = await conexion.execute(sql, params);

    if (result.affectedRows === undefined) return null;

    return result;
  };

  actualizar = async (id, salon) => {
    const campos = Object.keys(salon);
    const valores = Object.values(salon);

    const setValores = campos.map((campo) => `${campo} = ?`).join(", ");
    const parametros = [...valores, Number(id)];

    const sql = `UPDATE salones SET ${setValores} WHERE salon_id = ?`;

    const [result] = await conexion.execute(sql, parametros);

    if (result.affectedRows === 0) return null;

    return this.buscarPorId(id);
  };

  eliminar = async (id) => {
    const sql = "UPDATE salones SET activo = 0 WHERE salon_id = ?";
    const [result] = await conexion.execute(sql, [id]);

    if (result.affectedRows === 0) return null;

    return result;
  };
}
