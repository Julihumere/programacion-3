DELIMITER $$

DROP PROCEDURE IF EXISTS sp_informe_reservas$$

CREATE PROCEDURE sp_informe_reservas(
    IN p_salon_id INT,
    IN p_usuario_id INT
)
BEGIN
    SELECT 
        r.reserva_id,
        r.fecha_reserva,
        r.tematica,
        r.foto_cumpleaniero,
        r.activo AS reserva_activa,
        r.creado AS fecha_creacion_reserva,
        
        s.titulo AS salon_nombre,
        s.direccion AS salon_direccion,
        s.capacidad AS salon_capacidad,
        s.latitud AS salon_latitud,
        s.longitud AS salon_longitud,

        t.orden AS turno_orden,
        t.hora_desde AS turno_hora_inicio,
        t.hora_hasta AS turno_hora_fin,
        
        CONCAT(u.nombre, ' ', u.apellido) AS cliente_nombre_completo,
        u.nombre_usuario AS cliente_email,
        u.celular AS cliente_telefono,
        
        GROUP_CONCAT(
            DISTINCT CONCAT(
                srv.descripcion, 
                ' ($', 
                FORMAT(rs.importe, 2), 
                ')'
            ) 
            ORDER BY srv.descripcion 
            SEPARATOR ', '
        ) AS servicios_contratados,
        
        COUNT(DISTINCT rs.reserva_servicio_id) AS cantidad_servicios,
        COALESCE(SUM(rs.importe), 0) AS total_servicios,
        s.importe AS salon_precio_base,
        r.importe_salon,
        r.importe_total
        
    FROM reservas r
    INNER JOIN salones s ON r.salon_id = s.salon_id
    INNER JOIN turnos t ON r.turno_id = t.turno_id
    INNER JOIN usuarios u ON r.usuario_id = u.usuario_id
    LEFT JOIN reservas_servicios rs ON r.reserva_id = rs.reserva_id
    LEFT JOIN servicios srv ON rs.servicio_id = srv.servicio_id

    WHERE 1=1
        AND (p_salon_id IS NULL OR r.salon_id = p_salon_id)
        AND (p_usuario_id IS NULL OR r.usuario_id = p_usuario_id)
    
    GROUP BY 
        r.reserva_id,
        r.fecha_reserva,
        r.tematica,
        r.foto_cumpleaniero,
        r.importe_salon,
        r.importe_total,
        r.activo,
        r.creado,
        s.salon_id,
        s.titulo,
        s.direccion,
        s.capacidad,
        s.importe,
        s.latitud,
        s.longitud,
        t.turno_id,
        t.orden,
        t.hora_desde,
        t.hora_hasta,
        u.usuario_id,
        u.nombre_usuario,
        u.celular,
        u.tipo_usuario

    ORDER BY r.fecha_reserva DESC;
    
END$$
DELIMITER ;