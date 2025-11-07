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
