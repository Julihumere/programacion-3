import InformesService from "../services/informes.service.js";
import {
  mensajeError500,
  mensajeError404,
} from "../utils/mensajes.js";
import { generarInformeCSV } from "../utils/csvGenerator.js";

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

  descargarInformePDF = async (req, res) => {
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

      // Generar CSV
      const csvContent = generarInformeCSV(informe);

      // Configurar headers para descarga
      const fecha = new Date().toISOString().split('T')[0];
      const filename = `informe_reservas_${fecha}.csv`;

      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

      // Agregar BOM para que Excel reconozca UTF-8
      return res.status(200).send('\uFEFF' + csvContent);
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };
}
