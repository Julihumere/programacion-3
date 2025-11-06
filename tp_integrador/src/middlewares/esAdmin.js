const esAdmin = (req, res, next) => {
  const { tipo_usuario } = req.user.usuario;
  // tipo_usuario: 3=Cliente, 2=Empleado, 1=Administrador
  if (tipo_usuario !== 1) {
    return res.status(403).json({
      estado: "error",
      mensaje:
        "No tienes permisos para realizar esta acción. Solo administradores.",
    });
  }
  next();
};

export default esAdmin;
