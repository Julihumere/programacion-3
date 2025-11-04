import { conexion } from "./db.js";

export default class Salones {
  buscarTodos = async () => {
    const [salones] = await conexion.execute(
      "SELECT * FROM salones WHERE activo = 1"
    );

    if (salones.length === 0) return null;

    return salones;
  };

  buscarPorId = async (salon_id) => {
    const [salon] = await conexion.execute(
      "SELECT * FROM salones WHERE salon_id = ? AND activo = 1",
      [salon_id]
    );

    if (salon.length === 0) return null;

    return salon[0];
  };

  crear = async (salon) => {
    const [result] = await conexion.execute(
      "INSERT INTO salones (titulo, direccion, latitud, longitud, capacidad, importe, activo) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        salon.titulo,
        salon.direccion,
        salon.latitud ?? null,
        salon.longitud ?? null,
        salon.capacidad,
        salon.importe,
        salon.activo ?? 1,
      ]
    );
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
    const [result] = await conexion.execute(
      "DELETE FROM salones WHERE id = ?",
      [id]
    );
    return result;
  };
}
