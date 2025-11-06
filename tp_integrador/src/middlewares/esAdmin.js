const esAdmin = (req, res, next) => {
  const { tipo_usuario } = req.user;
  if (tipo_usuario !== 3) {
    return res.status(403).json({
      estado: "error",
      mensaje: "No tienes permisos para realizar esta acción. Solo administradores.",
    });
  }  
  next();
};

export default esAdmin;
