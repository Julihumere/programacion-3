import ReservasService from "../services/reservas.service.js";
import UsuariosService from "../services/usuarios.service.js";
import { enviarNotificacion } from "../utils/envioNotificacion.js";
import {
  mensajeError500,
  mensajeError404,
  mensajeError400,
} from "../utils/mensajes.js";

export default class ReservasController {
  constructor() {
    this.reservasService = new ReservasService();
    this.usuariosService = new UsuariosService();
  }

  listarReservas = async (req, res) => {
    try {
      const reservas = await this.reservasService.listarReservas();

      if (!reservas) {
        return res
          .status(404)
          .json(mensajeError404("No se encontraron reservas"));
      }

      return res.status(200).json({
        estado: "success",
        reservas,
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };

  listarMisReservas = async (req, res) => {
    try {
      const usuario_id = req.user.usuario_id;
      const reservas = await this.reservasService.listarReservasPorUsuario(
        usuario_id
      );

      if (!reservas) {
        return res
          .status(404)
          .json(mensajeError404("No tienes reservas registradas"));
      }

      return res.status(200).json({
        estado: "success",
        reservas,
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };

  obtenerReserva = async (req, res) => {
    try {
      const reserva = await this.reservasService.obtenerReserva(req.params.id);

      if (!reserva) {
        return res
          .status(404)
          .json(mensajeError404("No se encontró la reserva"));
      }

      return res.status(200).json({
        estado: "success",
        reserva: reserva,
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };

  crearReserva = async (req, res) => {
    try {
      const foto_cumpleaniero = req.file ? req.file.filename : null;
      const datos = { ...req.body, foto_cumpleaniero };

      const result = await this.reservasService.crearReserva(datos);

      if (!result) {
        return res
          .status(400)
          .json(mensajeError400("No se pudo crear la reserva"));
      }

      // Obtener la reserva completa para enviar notificación
      const reserva = await this.reservasService.obtenerReserva(
        result.reserva_id
      );

      const obtenerEmailsAdministradores =
        await this.usuariosService.obtenerEmailsAdministradores();

      const usuario = await this.usuariosService.obtenerUsuario(
        req.body.usuario_id
      );
      if (!obtenerEmailsAdministradores) {
        return res
          .status(404)
          .json(mensajeError404("No se encontraron administradores"));
      }

      if (!usuario) {
        return res
          .status(404)
          .json(mensajeError404("No se encontró el usuario"));
      }
      const destinatarioCliente = usuario.nombre_usuario;

      // Promesas para enviar notificaciones
      const promesasNotificaciones = [
        await enviarNotificacion(
          {
            titulo: "Nueva Reserva Recibida",
            reserva_id: result.reserva_id,
            fecha_reserva: req.body.fecha_reserva,
            cliente: `${usuario.nombre} ${usuario.apellido}`,
            salon: reserva.salon_titulo,
            turno: `${reserva.hora_desde} - ${reserva.hora_hasta}`,
            importe_total: reserva.importe_total,
            destinatario: obtenerEmailsAdministradores,
          },
          2
        ),
        await enviarNotificacion(
          {
            titulo: "Reserva Creada Correctamente",
            reserva_id: result.reserva_id,
            fecha_reserva: req.body.fecha_reserva,
            cliente: `${usuario.nombre} ${usuario.apellido}`,
            salon: reserva.salon_titulo,
            turno: `${reserva.hora_desde} - ${reserva.hora_hasta}`,
            importe_total: reserva.importe_total,
            destinatario: [destinatarioCliente],
          },
          5
        ),
      ];

      const [notificacionAdministrador, notificacionCliente] =
        await Promise.all(promesasNotificaciones);

      if (!notificacionAdministrador?.ok && !notificacionCliente?.ok) {
        return res
          .status(500)
          .json(mensajeError500("No se pudieron enviar las notificaciones"));
      }

      return res.status(201).json({
        estado: "success",
        mensaje: "Reserva creada correctamente",
        reserva_id: result.reserva_id,
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };

  actualizarReserva = async (req, res) => {
    try {
      const reserva = await this.reservasService.actualizarReserva(
        req.params.id,
        req.body
      );

      if (!reserva) {
        return res
          .status(400)
          .json(mensajeError400("No se pudo actualizar la reserva"));
      }

      return res.status(200).json({
        estado: "success",
        mensaje: "Reserva actualizada correctamente",
        reserva,
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };

  eliminarReserva = async (req, res) => {
    try {
      const reserva = await this.reservasService.eliminarReserva(req.params.id);

      if (!reserva) {
        return res
          .status(400)
          .json(mensajeError400("No se pudo eliminar la reserva"));
      }

      return res.status(200).json({
        estado: "success",
        mensaje: "Reserva cancelada correctamente",
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };

  // Métodos para gestionar servicios de una reserva
  obtenerServiciosReserva = async (req, res) => {
    try {
      const servicios = await this.reservasService.obtenerServiciosReserva(
        req.params.id
      );

      if (!servicios) {
        return res
          .status(404)
          .json(mensajeError404("No se encontró la reserva"));
      }

      return res.status(200).json({
        estado: "success",
        servicios,
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };

  agregarServicioReserva = async (req, res) => {
    try {
      const { servicio_id } = req.body;

      await this.reservasService.agregarServicioReserva(
        req.params.id,
        servicio_id
      );

      return res.status(201).json({
        estado: "success",
        mensaje: "Servicio agregado a la reserva correctamente",
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };

  eliminarServicioReserva = async (req, res) => {
    try {
      const { reserva_id, servicio_id } = req.params;
      await this.reservasService.eliminarServicioReserva(
        reserva_id,
        servicio_id
      );

      return res.status(200).json({
        estado: "success",
        mensaje: "Servicio eliminado de la reserva correctamente",
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };
}
