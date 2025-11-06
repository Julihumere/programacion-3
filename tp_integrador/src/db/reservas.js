import { conexion } from "./db.js";

export default class Reservas {
  buscarTodos = async () => {
    const sql = `
      SELECT 
        r.*,
        s.titulo as salon_titulo,
        s.direccion as salon_direccion,
        u.nombre as usuario_nombre,
        u.apellido as usuario_apellido,
        u.nombre_usuario as usuario_email,
        t.hora_desde,
        t.hora_hasta
      FROM reservas r
      INNER JOIN salones s ON r.salon_id = s.salon_id
      INNER JOIN usuarios u ON r.usuario_id = u.usuario_id
      INNER JOIN turnos t ON r.turno_id = t.turno_id
      WHERE r.activo = 1
      ORDER BY r.fecha_reserva DESC, t.hora_desde ASC
    `;
    const [reservas] = await conexion.execute(sql);

    if (reservas.length === 0) return null;

    return reservas;
  };

  buscarPorId = async (reserva_id) => {
    const sql = `
      SELECT 
        r.*,
        s.titulo as salon_titulo,
        s.direccion as salon_direccion,
        s.capacidad as salon_capacidad,
        u.nombre as usuario_nombre,
        u.apellido as usuario_apellido,
        u.nombre_usuario as usuario_email,
        u.celular as usuario_celular,
        t.hora_desde,
        t.hora_hasta
      FROM reservas r
      INNER JOIN salones s ON r.salon_id = s.salon_id
      INNER JOIN usuarios u ON r.usuario_id = u.usuario_id
      INNER JOIN turnos t ON r.turno_id = t.turno_id
      WHERE r.reserva_id = ? AND r.activo = 1
    `;
    const [reserva] = await conexion.execute(sql, [reserva_id]);

    if (reserva.length === 0) return null;

    return reserva[0];
  };

  buscarPorUsuario = async (usuario_id) => {
    console.log("buscarPorUsuario", usuario_id);
    const sql = `
      SELECT 
        r.*,
        s.titulo as salon_titulo,
        s.direccion as salon_direccion,
        t.hora_desde,
        t.hora_hasta
      FROM reservas r
      INNER JOIN salones s ON r.salon_id = s.salon_id
      INNER JOIN turnos t ON r.turno_id = t.turno_id
      WHERE r.usuario_id = ? AND r.activo = 1
      ORDER BY r.fecha_reserva DESC, t.hora_desde ASC
    `;
    const [reservas] = await conexion.execute(sql, [usuario_id]);

    console.log("reservas", reservas);

    if (reservas.length === 0) return null;

    return reservas;
  };

  crear = async (reserva) => {
    const sql = `
      INSERT INTO reservas 
      (fecha_reserva, salon_id, usuario_id, turno_id, foto_cumpleaniero, tematica, importe_salon, importe_total, activo) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      reserva.fecha_reserva,
      reserva.salon_id,
      reserva.usuario_id,
      reserva.turno_id,
      reserva.foto_cumpleaniero ?? null,
      reserva.tematica ?? null,
      reserva.importe_salon,
      reserva.importe_total,
      reserva.activo ?? 1,
    ];
    const [result] = await conexion.execute(sql, params);

    if (result.affectedRows === undefined) return null;

    return result;
  };

  actualizar = async (id, reserva) => {
    const campos = Object.keys(reserva);
    const valores = Object.values(reserva);

    const setValores = campos.map((campo) => `${campo} = ?`).join(", ");
    const parametros = [...valores, Number(id)];

    const sql = `UPDATE reservas SET ${setValores} WHERE reserva_id = ?`;

    const [result] = await conexion.execute(sql, parametros);

    if (result.affectedRows === 0) return null;

    return this.buscarPorId(id);
  };

  eliminar = async (id) => {
    const sql = "UPDATE reservas SET activo = 0 WHERE reserva_id = ?";
    const [result] = await conexion.execute(sql, [id]);

    if (result.affectedRows === 0) return null;

    return result;
  };

  // Métodos para gestionar servicios de una reserva
  obtenerServiciosReserva = async (reserva_id) => {
    const sql = `
      SELECT 
        rs.reserva_servicio_id,
        rs.reserva_id,
        rs.servicio_id,
        rs.importe,
        s.descripcion as servicio_descripcion
      FROM reservas_servicios rs
      INNER JOIN servicios s ON rs.servicio_id = s.servicio_id
      WHERE rs.reserva_id = ?
    `;
    const [servicios] = await conexion.execute(sql, [reserva_id]);

    return servicios;
  };

  agregarServicioReserva = async (reserva_id, servicio_id, importe) => {
    const sql = `
      INSERT INTO reservas_servicios (reserva_id, servicio_id, importe)
      VALUES (?, ?, ?)
    `;
    const [result] = await conexion.execute(sql, [
      reserva_id,
      servicio_id,
      importe,
    ]);

    return result;
  };

  eliminarServicioReserva = async (reserva_id, servicio_id) => {
    const sql =
      "DELETE FROM reservas_servicios WHERE reserva_id = ? AND servicio_id = ?";
    const [result] = await conexion.execute(sql, [reserva_id, servicio_id]);

    return result;
  };
}
