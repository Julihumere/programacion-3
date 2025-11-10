import Turnos from "../db/turnos.js";

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
    const nuevoTurno = await this.turnos.crear(turno);
    if (!nuevoTurno) return null;

    return nuevoTurno;
  };

  actualizarTurno = async (turno_id, turno) => {
    const turnoExistente = await this.turnos.buscarPorId(turno_id);
    if (!turnoExistente) return null;

    return await this.turnos.actualizar(turno_id, turno);
  };

  eliminarTurno = async (turno_id) => {
    const turno = await this.turnos.eliminar(turno_id);
    if (!turno) return null;

    return turno;
  };
}
