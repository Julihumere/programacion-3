const esAdmin = (req, res, next) => {
  const { tipo_usuario } = req.usuario;
  if (tipo_usuario !== 1) {
    return res.status(401).json({
      status: "error",
      message: "No tienes permisos para realizar esta acción",
    });
  }
  next();
};

export default esAdmin;
