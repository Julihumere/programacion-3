import { mensajeError401 } from "../utils/mensajes.js";

export const autorizarUsuarios = (tipo_usuario_permitido) => {
  return (req, res, next) => {
    const { tipo_usuario } = req.user;
    if (!tipo_usuario_permitido.includes(tipo_usuario)) {
      return res
        .status(401)
        .json(mensajeError401("No tienes permisos para realizar esta acción"));
    }
    next();
  };
};
