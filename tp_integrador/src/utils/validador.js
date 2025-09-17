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
