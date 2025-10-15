export const validarSalonBody = (body) => {
  const { titulo, direccion, capacidad, importe, activo } = body || {};
  if (!titulo || !direccion || !capacidad || !importe || !activo) {
    return {
      ok: false,
      message:
        "Campos requeridos: titulo, direccion, capacidad, importe, activo",
    };
  }
  return { ok: true };
};

export const validarServicioBody = (body) => {
  const { descripcion, importe, activo } = body || {};
  if (!descripcion || !importe || activo === undefined) {
    return {
      ok: false,
      message: "Campos requeridos: descripcion, importe, activo",
    };
  }
  return { ok: true };
};

export const validarTurnoBody = (body) => {
  const { orden, hora_desde, hora_hasta, activo } = body || {};
  if (orden === undefined || !hora_desde || !hora_hasta || activo === undefined) {
    return {
      ok: false,
      message: "Campos requeridos: orden, hora_desde, hora_hasta, activo",
    };
  }
  return { ok: true };
};


