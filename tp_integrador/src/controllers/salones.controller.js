import SalonesService from "../services/salones.service.js";
import { enviarNotificacion } from "../utils/envioNotificacion.js";
import {
  mensajeError500,
  mensajeError404,
  mensajeError400,
} from "../utils/mensajes.js";
import apicache from "apicache";

export default class SalonesController {
  constructor() {
    this.salonesService = new SalonesService();
  }

  listarSalones = async (req, res) => {
    try {
      const salones = await this.salonesService.listarSalones();

      if (!salones) {
        return res
          .status(404)
          .json(mensajeError404("No se encontraron salones"));
      }

      return res.status(200).json({
        estado: "success",
        salones,
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };

  obtenerSalon = async (req, res) => {
    try {
      const salon = await this.salonesService.obtenerSalon(req.params.id);

      if (!salon) {
        return res.status(404).json(mensajeError404("No se encontró el salon"));
      }

      return res.status(200).json({
        estado: "success",
        salon: salon,
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };

  crearSalon = async (req, res) => {
    try {
      const salon = await this.salonesService.crearSalon(req.body);
      if (!salon) {
        return res
          .status(400)
          .json(mensajeError400("No se pudo crear el salon"));
      }

      apicache.clear();

      await enviarNotificacion(
        {
          titulo: `Nuevo Salón de Fiestas: ${salon.titulo}`,
          direccion: salon.direccion,
          latitud: salon.latitud,
          longitud: salon.longitud,
          capacidad: salon.capacidad,
          importe: salon.importe,
          destinatario: process.env.EMAIL_DESTINATARIO,
        },
        1
      );

      return res.status(201).json({
        estado: "success",
        mensaje: "Salon creado correctamente",
        salon,
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };

  actualizarSalon = async (req, res) => {
    try {
      const salon = await this.salonesService.actualizarSalon(
        req.params.id,
        req.body
      );
      if (!salon) {
        return res
          .status(400)
          .json(mensajeError400("No se pudo actualizar el salon"));
      }
      return res.status(200).json({
        estado: "success",
        mensaje: "Salon actualizado correctamente",
        salon,
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };

  eliminarSalon = async (req, res) => {
    try {
      const salon = await this.salonesService.eliminarSalon(req.params.id);
      if (!salon) {
        return res
          .status(400)
          .json(mensajeError400("No se pudo eliminar el salon"));
      }
      return res.status(200).json({
        estado: "success",
        mensaje: "Salon eliminado correctamente",
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };
}
