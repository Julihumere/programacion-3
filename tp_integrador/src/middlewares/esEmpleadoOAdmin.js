const esEmpleadoOAdmin = (req, res, next) => {
  console.log("req.user", req.user);

  const { tipo_usuario } = req.user.usuario;

  console.log("tipo_usuario", tipo_usuario);

  // tipo_usuario: 3=Cliente, 2=Empleado, 1=Administrador
  if (tipo_usuario === 3) {
    return res.status(403).json({
      estado: "error",
      mensaje:
        "No tienes permisos para acceder a este recurso. Solo empleados y administradores.",
    });
  }

  next();
};

export default esEmpleadoOAdmin;
