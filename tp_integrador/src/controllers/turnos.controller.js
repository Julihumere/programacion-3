import TurnosService from "../services/turnos.service.js";
import { enviarNotificacion } from "../utils/envioNotificacion.js";
import {
  mensajeError500,
  mensajeError404,
  mensajeError400,
} from "../utils/mensajes.js";
import NotificacionesService from "../services/notificaciones.service.js";
import UsuariosService from "../services/usuarios.service.js";

export default class TurnosController {
  constructor() {
    this.turnosService = new TurnosService();
    this.notificacionesService = new NotificacionesService();
    this.usuariosService = new UsuariosService();
  }

  listarTurnos = async (req, res) => {
    try {
      const turnos = await this.turnosService.listarTurnos();
      if (!turnos) {
        return res
          .status(404)
          .json(mensajeError404("No se encontraron turnos"));
      }
      return res.status(200).json({ estado: "success", turnos });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };

  obtenerTurno = async (req, res) => {
    try {
      const turnoId = req.params.id;
      const turno = await this.turnosService.obtenerTurno(turnoId);
      if (!turno) {
        return res.status(404).json(mensajeError404("No se encontró el turno"));
      }
      return res.status(200).json({ estado: "success", turno });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };

  crearTurno = async (req, res) => {
    try {
      const turno = await this.turnosService.crearTurno(req.body);
      if (!turno) {
        return res
          .status(400)
          .json(mensajeError400("No se pudo crear el turno"));
      }

      const obtenerEmailsAdministradores =
        await this.usuariosService.obtenerEmailsAdministradores();
      if (!obtenerEmailsAdministradores) {
        return res
          .status(404)
          .json(mensajeError404("No se encontraron administradores"));
      }

      const nuevoTurno = await this.turnosService.obtenerTurno(turno.insertId);
      if (!nuevoTurno) {
        return res
          .status(400)
          .json(mensajeError400("No se pudo obtener el nuevo turno"));
      }

      const notificacionAdministrador =
        await this.notificacionesService.enviarCorreo(
          {
            titulo: `Nuevo Turno: ${nuevoTurno.orden}`,
            orden: nuevoTurno.orden,
            hora_desde: nuevoTurno.hora_desde,
            hora_hasta: nuevoTurno.hora_hasta,
            destinatario: obtenerEmailsAdministradores,
          },
          4
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
        mensaje: "Turno creado correctamente",
        turno: nuevoTurno,
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };

  actualizarTurno = async (req, res) => {
    try {
      const turnoId = req.params.id;
      const turno = await this.turnosService.actualizarTurno(turnoId, req.body);
      if (!turno) {
        return res
          .status(400)
          .json(mensajeError400("No se pudo actualizar el turno"));
      }

      return res.status(200).json({
        estado: "success",
        mensaje: "Turno actualizado correctamente",
        turno,
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };

  eliminarTurno = async (req, res) => {
    try {
      const turnoId = req.params.id;
      const turno = await this.turnosService.eliminarTurno(turnoId);
      if (!turno) {
        return res
          .status(400)
          .json(mensajeError400("No se pudo eliminar el turno"));
      }

      return res.status(200).json({
        estado: "success",
        mensaje: "Turno eliminado correctamente",
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };
}
