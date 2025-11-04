import Servicios from "../config/servicios.js";

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
    return await this.servicios.crear(servicio);
  };

  actualizarServicio = async (servicio_id, servicio) => {
    const servicioExistente = await this.servicios.buscarPorId(servicio_id);
    if (!servicioExistente) return null;

    return await this.servicios.actualizar(servicio_id, servicio);
  };

  eliminarServicio = async (servicio_id) => {
    return await this.servicios.eliminar(servicio_id);
  };
}
