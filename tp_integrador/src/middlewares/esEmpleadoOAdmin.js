const esEmpleadoOAdmin = (req, res, next) => {
  const { tipo_usuario } = req.user;
  
  // tipo_usuario: 1=Cliente, 2=Empleado, 3=Administrador
  if (tipo_usuario === 1) {
    return res.status(403).json({
      estado: "error",
      mensaje: "No tienes permisos para acceder a este recurso. Solo empleados y administradores.",
    });
  }
  
  next();
};

export default esEmpleadoOAdmin;
