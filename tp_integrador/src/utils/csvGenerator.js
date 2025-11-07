
export const generarInformeCSV = (reservas) => {
  if (!reservas || reservas.length === 0) {
    return 'No se encontraron reservas con los filtros aplicados.';
  }

  // Encabezados del CSV
  const headers = [
    'ID Reserva',
    'Fecha Reserva',
    'Temática',
    'Salón',
    'Dirección Salón',
    'Capacidad Salón',
    'Turno Inicio',
    'Turno Fin',
    'Cliente',
    'Email Cliente',
    'Teléfono Cliente',
    'Servicios Contratados',
    'Cantidad Servicios',
    'Total Servicios',
    'Precio Base Salón',
    'Importe Salón',
    'Importe Total'
  ];

  // Convertir array de headers a string CSV
  let csv = headers.join(',') + '\n';

  // Agregar cada fila de datos
  reservas.forEach(reserva => {
    const row = [
      reserva.reserva_id || '',
      reserva.fecha_reserva ? new Date(reserva.fecha_reserva).toLocaleDateString('es-AR') : '',
      escaparCSV(reserva.tematica || ''),
      escaparCSV(reserva.salon_nombre || ''),
      escaparCSV(reserva.salon_direccion || ''),
      reserva.salon_capacidad || '',
      reserva.turno_hora_inicio || '',
      reserva.turno_hora_fin || '',
      escaparCSV(reserva.cliente_nombre_completo || ''),
      reserva.cliente_email || '',
      reserva.cliente_telefono || '',
      escaparCSV(reserva.servicios_contratados || 'Sin servicios'),
      reserva.cantidad_servicios || 0,
      parseFloat(reserva.total_servicios || 0).toFixed(2),
      parseFloat(reserva.salon_precio_base || 0).toFixed(2),
      parseFloat(reserva.importe_salon || 0).toFixed(2),
      parseFloat(reserva.importe_total || 0).toFixed(2)
    ];

    csv += row.join(',') + '\n';
  });

  // Agregar línea de totales
  const totalReservas = reservas.length;
  const totalServicios = reservas.reduce((sum, r) => sum + parseFloat(r.total_servicios || 0), 0);
  const totalSalones = reservas.reduce((sum, r) => sum + parseFloat(r.importe_salon || 0), 0);
  const totalGeneral = reservas.reduce((sum, r) => sum + parseFloat(r.importe_total || 0), 0);

  csv += '\n';
  csv += `TOTALES,${totalReservas} reservas,,,,,,,,,,,,${totalServicios.toFixed(2)},,${totalSalones.toFixed(2)},${totalGeneral.toFixed(2)}\n`;

  return csv;
};


const escaparCSV = (value) => {
  if (value === null || value === undefined) return '';
  
  const stringValue = String(value);
  
  // Si contiene coma, comilla doble o salto de línea, envolver en comillas
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    // Reemplazar comillas dobles por dos comillas dobles
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  
  return stringValue;
};
