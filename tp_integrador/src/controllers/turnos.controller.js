import TurnosService from "../services/turnos.service.js";
import { enviarNotificacion } from "../utils/envioNotificacion.js";
import {
  mensajeError500,
  mensajeError404,
  mensajeError400,
} from "../utils/mensajes.js";

export default class TurnosController {
  constructor() {
    this.turnosService = new TurnosService();
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

      await enviarNotificacion(
        {
          titulo: `Nuevo Turno: ${turno.orden}`,
          hora_desde: turno.hora_desde,
          hora_hasta: turno.hora_hasta,
          destinatario: process.env.EMAIL_DESTINATARIO,
        },
        3
      );

      return res.status(201).json({
        estado: "success",
        mensaje: "Turno creado correctamente",
        turno,
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
