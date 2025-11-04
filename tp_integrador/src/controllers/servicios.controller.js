import ServiciosService from "../services/servicios.service.js";
import { enviarNotificacion } from "../utils/envioNotificacion.js";
import {
  mensajeError500,
  mensajeError404,
  mensajeError400,
} from "../utils/mensajes.js";
import apicache from "apicache";

export default class ServiciosController {
  constructor() {
    this.serviciosService = new ServiciosService();
  }

  listarServicios = async (req, res) => {
    try {
      const servicios = await this.serviciosService.listarServicios();

      if (!servicios) {
        return res
          .status(404)
          .json(mensajeError404("No se encontraron servicios"));
      }

      return res.status(200).json({
        estado: "success",
        servicios,
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };

  obtenerServicio = async (req, res) => {
    try {
      const servicioId = req.params.id;
      const servicio = await this.serviciosService.obtenerServicio(servicioId);
      if (!servicio) {
        return res
          .status(404)
          .json(mensajeError404("No se encontró el servicio"));
      }
      return res.status(200).json({
        estado: "success",
        servicio,
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };

  crearServicio = async (req, res) => {
    try {
      const servicio = await this.serviciosService.crearServicio(req.body);
      if (!servicio) {
        return res
          .status(400)
          .json(mensajeError400("No se pudo crear el servicio"));
      }

      apicache.clear();

      await enviarNotificacion(
        {
          titulo: `Nuevo Servicio: ${servicio.descripcion}`,
          importe: servicio.importe,
          destinatario: process.env.EMAIL_DESTINATARIO,
        },
        2
      );

      return res.status(201).json({
        estado: "success",
        mensaje: "Servicio creado correctamente",
        servicio,
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };

  actualizarServicio = async (req, res) => {
    try {
      const servicio = await this.serviciosService.actualizarServicio(
        req.params.id,
        req.body
      );
      if (!servicio) {
        return res
          .status(400)
          .json(mensajeError400("No se pudo actualizar el servicio"));
      }

      apicache.clear();
      return res.status(200).json({
        estado: "success",
        mensaje: "Servicio actualizado correctamente",
        servicio,
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };

  eliminarServicio = async (req, res) => {
    try {
      const servicio = await this.serviciosService.eliminarServicio(
        req.params.id
      );
      if (!servicio) {
        return res
          .status(400)
          .json(mensajeError400("No se pudo eliminar el servicio"));
      }
      apicache.clear();
      return res.status(200).json({
        estado: "success",
        mensaje: "Servicio eliminado correctamente",
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };
}
