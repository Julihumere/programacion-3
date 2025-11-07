import { conexion } from "../db/db.js";

export default class Informes {
  static async obtenerInformeReservas(salon_id = null, usuario_id = null) {
    try {
      const query = "CALL sp_informe_reservas(?, ?)";
      const [rows] = await conexion.query(query, [salon_id, usuario_id]);
      
      return rows[0];
    } catch (error) {
      console.error("Error al obtener informe de reservas:", error);
      throw error;
    }
  }
}
