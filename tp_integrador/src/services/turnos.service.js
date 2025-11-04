import Turnos from "../config/turnos.js";

export default class TurnosService {
  constructor() {
    this.turnos = new Turnos();
  }

  listarTurnos = async () => {
    return await this.turnos.buscarTodos();
  };

  obtenerTurno = async (turno_id) => {
    return await this.turnos.buscarPorId(turno_id);
  };

  crearTurno = async (turno) => {
    return await this.turnos.crear(turno);
  };

  actualizarTurno = async (turno_id, turno) => {
    const turnoExistente = await this.turnos.buscarPorId(turno_id);
    if (!turnoExistente) return null;

    return await this.turnos.actualizar(turno_id, turno);
  };

  eliminarTurno = async (turno_id) => {
    return await this.turnos.eliminar(turno_id);
  };
}
