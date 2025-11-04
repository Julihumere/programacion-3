import Salones from "../config/salones.js";

export default class SalonesService {
  constructor() {
    this.salones = new Salones();
  }

  listarSalones = async () => {
    return await this.salones.buscarTodos();
  };

  obtenerSalon = async (salon_id) => {
    return await this.salones.buscarPorId(salon_id);
  };

  crearSalon = async (salon) => {
    return await this.salones.crear(salon);
  };

  actualizarSalon = async (salon_id, salon) => {
    const salonExistente = await this.salones.buscarPorId(salon_id);
    if (!salonExistente) return null;

    return await this.salones.actualizar(salon_id, salon);
  };

  eliminarSalon = async (salon_id) => {
    return await this.salones.eliminar(salon_id);
  };
}
