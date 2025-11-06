import Servicios from "../db/servicios.js";
import apicache from "apicache";

export default class ServiciosService {
  constructor() {
    this.servicios = new Servicios();
  }

  listarServicios = async () => {
    return await this.servicios.buscarTodos();
  };

  obtenerServicio = async (servicio_id) => {
    return await this.servicios.buscarPorId(servicio_id);
  };

  crearServicio = async (servicio) => {
    const nuevoServicio = await this.servicios.crear(servicio);
    if (!nuevoServicio) return null;

    apicache.clear();

    return nuevoServicio;
  };

  actualizarServicio = async (servicio_id, servicio) => {
    const servicioExistente = await this.servicios.buscarPorId(servicio_id);
    if (!servicioExistente) return null;

    apicache.clear();

    return await this.servicios.actualizar(servicio_id, servicio);
  };

  eliminarServicio = async (servicio_id) => {
    const servicio = await this.servicios.eliminar(servicio_id);
    if (!servicio) return null;

    apicache.clear();

    return servicio;
  };
}
