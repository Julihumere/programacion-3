import jwt from "jsonwebtoken";

const validarSesion = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "No se proporcionó un token de autenticación",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Token inválido",
    });
  }
};

export { validarSesion };
