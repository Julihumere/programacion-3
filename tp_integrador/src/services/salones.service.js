import Salones from "../db/salones.js";
import NotificacionesService from "./notificaciones.service.js";
import apicache from "apicache";

export default class SalonesService {
  constructor() {
    this.salones = new Salones();
    this.notificacionesService = new NotificacionesService();
  }

  listarSalones = async () => {
    return await this.salones.buscarTodos();
  };

  obtenerSalon = async (salon_id) => {
    return await this.salones.buscarPorId(salon_id);
  };

  crearSalon = async (salon) => {
    const nuevoSalon = await this.salones.crear(salon);
    if (!nuevoSalon) return null;

    apicache.clear();

    const notificacion = await this.notificacionesService.enviarCorreo(
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

    if (!notificacion.ok) return null;

    return nuevoSalon;
  };

  actualizarSalon = async (salon_id, salon) => {
    const salonExistente = await this.salones.buscarPorId(salon_id);
    if (!salonExistente) return null;

    apicache.clear();

    return await this.salones.actualizar(salon_id, salon);
  };

  eliminarSalon = async (salon_id) => {
    const salon = await this.salones.eliminar(salon_id);
    if (!salon) return null;

    apicache.clear();

    return salon;
  };
}
