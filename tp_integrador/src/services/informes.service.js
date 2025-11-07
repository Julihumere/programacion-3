import Informes from "../db/informes.js";

export default class InformesService {
  async obtenerInformeReservas(salon_id, usuario_id) {
    try {
      const informe = await Informes.obtenerInformeReservas(salon_id, usuario_id);
      
      if (!informe || informe.length === 0) {
        return null;
      }
      
      return informe;
    } catch (error) {
      console.error("Error en InformesService:", error);
      throw error;
    }
  }
}
