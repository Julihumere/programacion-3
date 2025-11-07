import SalonesService from "../services/salones.service.js";
import NotificacionesService from "../services/notificaciones.service.js";
import UsuariosService from "../services/usuarios.service.js";
import {
  mensajeError500,
  mensajeError404,
  mensajeError400,
} from "../utils/mensajes.js";

export default class SalonesController {
  constructor() {
    this.salonesService = new SalonesService();
    this.notificacionesService = new NotificacionesService();
    this.usuariosService = new UsuariosService();
  }

  listarSalones = async (_req, res) => {
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

      const obtenerEmailsAdministradores =
        await this.usuariosService.obtenerEmailsAdministradores();

      if (!obtenerEmailsAdministradores) {
        return res
          .status(404)
          .json(mensajeError404("No se encontraron administradores"));
      }

      const nuevoSalon = await this.salonesService.obtenerSalon(salon.insertId);
      if (!nuevoSalon) {
        return res
          .status(400)
          .json(mensajeError400("No se pudo obtener el nuevo salon"));
      }

      const notificacionAdministrador =
        await this.notificacionesService.enviarCorreo(
          {
            titulo: `Nuevo Salón de Fiestas: ${nuevoSalon.titulo}`,
            direccion: nuevoSalon.direccion,
            latitud: nuevoSalon.latitud ?? "No disponible",
            longitud: nuevoSalon.longitud ?? "No disponible",
            capacidad: nuevoSalon.capacidad,
            importe: nuevoSalon.importe,
            destinatario: obtenerEmailsAdministradores,
          },
          1
        );

      if (!notificacionAdministrador?.ok) {
        return res
          .status(500)
          .json(
            mensajeError500(
              "No se pudo enviar la notificación al administrador"
            )
          );
      }

      return res.status(201).json({
        estado: "success",
        mensaje: "Salon creado correctamente",
        salon: nuevoSalon,
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
