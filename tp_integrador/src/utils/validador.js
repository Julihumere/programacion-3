export const validarSalonBody = (
  body,
  esActualizacion = false,
  salonExistente = null
) => {
  const { titulo, direccion, capacidad, importe, activo } = body || {};
  if (esActualizacion) {
    if (
      salonExistente.titulo === titulo ||
      salonExistente.direccion === direccion ||
      Number(salonExistente.capacidad) === capacidad ||
      Number(salonExistente.importe) === importe ||
      salonExistente.activo === activo
    ) {
      return {
        ok: false,
        message: "No hay cambios para actualizar",
      };
    }
    return { ok: true };
  }
  if (!titulo || !direccion || !capacidad || !importe || !activo) {
    return {
      ok: false,
      message:
        "Campos requeridos: titulo, direccion, capacidad, importe, activo",
    };
  }
  return { ok: true };
};

export const validarServicioBody = (
  body,
  esActualizacion = false,
  servicioExistente = null
) => {
  const { descripcion, importe, activo } = body || {};

  let sql = "";

  if (esActualizacion) {
    if (
      servicioExistente.descripcion === descripcion ||
      Number(servicioExistente.importe) === importe ||
      servicioExistente.activo === activo
    ) {
      return {
        ok: false,
        message: "No hay cambios para actualizar",
      };
    }

    return { ok: true };
  }

  if (!descripcion || !importe || activo === undefined) {
    return {
      ok: false,
      message: "Campos requeridos: descripcion, importe, activo",
    };
  }
  return { ok: true };
};

export const validarTurnoBody = (
  body,
  esActualizacion = false,
  turnoExistente = null
) => {
  const { orden, hora_desde, hora_hasta, activo } = body || {};
  if (esActualizacion) {
    if (
      turnoExistente.orden === orden ||
      turnoExistente.hora_desde === hora_desde ||
      turnoExistente.hora_hasta === hora_hasta ||
      turnoExistente.activo === activo
    ) {
      return {
        ok: false,
        message: "No hay cambios para actualizar",
      };
    }
    return { ok: true };
  }
  if (!orden || !hora_desde || !hora_hasta || !activo) {
    return {
      ok: false,
      message: "Campos requeridos: orden, hora_desde, hora_hasta, activo",
    };
  }
  return { ok: true };
};
