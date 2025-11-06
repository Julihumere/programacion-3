import InformesService from "../services/informes.service.js";
import {
  mensajeError500,
  mensajeError404,
} from "../utils/mensajes.js";

export default class InformesController {
  constructor() {
    this.informesService = new InformesService();
  }

  obtenerInformeReservas = async (req, res) => {
    try {
      const { salon_id, usuario_id } = req.query;
      
      const informe = await this.informesService.obtenerInformeReservas(
        salon_id || null,
        usuario_id || null
      );

      if (!informe) {
        return res
          .status(404)
          .json(mensajeError404("No se encontraron reservas para el informe"));
      }

      return res.status(200).json({
        estado: "success",
        total_registros: informe.length,
        data: informe,
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };
}
