const mensajeError500 = (error) => {
  return {
    estado: "Error",
    mensaje: error.message || "Error interno del servidor",
  };
};

const mensajeError400 = (mensaje) => {
  return {
    estado: "Error",
    mensaje: mensaje || "Error de validación",
  };
};

const mensajeError401 = (mensaje) => {
  return {
    estado: "Error",
    mensaje: mensaje || "Error de autenticación",
  };
};

const mensajeError403 = (mensaje) => {
  return {
    estado: "Error",
    mensaje: mensaje || "No tienes permisos para realizar esta acción",
  };
};

const mensajeError404 = (mensaje) => {
  return {
    estado: "Error",
    mensaje: mensaje || "Recurso no encontrado",
  };
};

export {
  mensajeError500,
  mensajeError404,
  mensajeError403,
  mensajeError401,
  mensajeError400,
};
