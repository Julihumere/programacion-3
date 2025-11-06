import Reservas from "../db/reservas.js";
import Salones from "../db/salones.js";
import Turnos from "../db/turnos.js";
import Servicios from "../db/servicios.js";

export default class ReservasService {
  constructor() {
    this.reservas = new Reservas();
    this.salones = new Salones();
    this.turnos = new Turnos();
    this.servicios = new Servicios();
  }

  listarReservas = async () => {
    return await this.reservas.buscarTodos();
  };

  obtenerReserva = async (reserva_id) => {
    const reserva = await this.reservas.buscarPorId(reserva_id);

    if (!reserva) return null;

    // Obtener servicios asociados a la reserva
    const servicios = await this.reservas.obtenerServiciosReserva(reserva_id);

    return {
      ...reserva,
      servicios: servicios || [],
    };
  };

  listarReservasPorUsuario = async (usuario_id) => {
    console.log("listarReservasPorUsuario");

    return await this.reservas.buscarPorUsuario(usuario_id);
  };

  crearReserva = async (reserva) => {
    // Validar que exista el salón
    const salon = await this.salones.buscarPorId(reserva.salon_id);
    if (!salon) {
      throw new Error("El salón especificado no existe");
    }

    // Validar que exista el turno
    const turno = await this.turnos.buscarPorId(reserva.turno_id);
    if (!turno) {
      throw new Error("El turno especificado no existe");
    }

    // Establecer importe_salon con el precio del salón
    reserva.importe_salon = salon.importe;

    // Calcular importe total inicial (solo salón)
    let importe_total = parseFloat(salon.importe);

    // Si hay servicios, validarlos y sumar sus importes
    if (reserva.servicios && reserva.servicios.length > 0) {
      for (const servicio_id of reserva.servicios) {
        const servicio = await this.servicios.buscarPorId(servicio_id);
        if (!servicio) {
          throw new Error(`El servicio con ID ${servicio_id} no existe`);
        }
        importe_total += parseFloat(servicio.importe);
      }
    }

    reserva.importe_total = importe_total;

    // Crear la reserva
    const result = await this.reservas.crear(reserva);

    if (!result) return null;

    const reserva_id = result.insertId;

    // Agregar servicios a la reserva si existen
    if (reserva.servicios && reserva.servicios.length > 0) {
      for (const servicio_id of reserva.servicios) {
        const servicio = await this.servicios.buscarPorId(servicio_id);
        await this.reservas.agregarServicioReserva(
          reserva_id,
          servicio_id,
          servicio.importe
        );
      }
    }

    return { ...result, reserva_id };
  };

  actualizarReserva = async (reserva_id, reserva) => {
    const reservaExistente = await this.reservas.buscarPorId(reserva_id);
    if (!reservaExistente) return null;

    // Si se actualiza el salón, actualizar el importe_salon
    if (reserva.salon_id) {
      const salon = await this.salones.buscarPorId(reserva.salon_id);
      if (!salon) {
        throw new Error("El salón especificado no existe");
      }
      reserva.importe_salon = salon.importe;
    }

    // Si se actualiza el turno, validarlo
    if (reserva.turno_id) {
      const turno = await this.turnos.buscarPorId(reserva.turno_id);
      if (!turno) {
        throw new Error("El turno especificado no existe");
      }
    }

    return await this.reservas.actualizar(reserva_id, reserva);
  };

  eliminarReserva = async (reserva_id) => {
    return await this.reservas.eliminar(reserva_id);
  };

  // Métodos para gestionar servicios de una reserva
  obtenerServiciosReserva = async (reserva_id) => {
    const reserva = await this.reservas.buscarPorId(reserva_id);
    if (!reserva) return null;

    return await this.reservas.obtenerServiciosReserva(reserva_id);
  };

  agregarServicioReserva = async (reserva_id, servicio_id) => {
    const reserva = await this.reservas.buscarPorId(reserva_id);
    if (!reserva) {
      throw new Error("La reserva especificada no existe");
    }

    const servicio = await this.servicios.buscarPorId(servicio_id);
    if (!servicio) {
      throw new Error("El servicio especificado no existe");
    }

    const servicios = await this.reservas.obtenerServiciosReserva(reserva_id);
    if (servicios.some((s) => s.servicio_id === servicio_id)) {
      throw new Error("El servicio ya existe en la reserva");
    }

    // Agregar el servicio a la reserva
    await this.reservas.agregarServicioReserva(
      reserva_id,
      servicio_id,
      servicio.importe
    );

    // Actualizar el importe total de la reserva
    const nuevoImporteTotal =
      parseFloat(reserva.importe_total) + parseFloat(servicio.importe);
    await this.reservas.actualizar(reserva_id, {
      importe_total: nuevoImporteTotal,
    });

    return { success: true };
  };

  eliminarServicioReserva = async (reserva_id, servicio_id) => {
    return await this.reservas.eliminarServicioReserva(reserva_id, servicio_id);
  };
}
