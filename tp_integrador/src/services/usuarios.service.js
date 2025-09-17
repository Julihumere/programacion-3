import { conexion } from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const crearUsuario = async (usuario) => {
  const {
    nombre,
    apellido,
    nombre_usuario,
    contrasenia,
    tipo_usuario,
    celular,
    foto,
  } = usuario;

  const encriptarContrasenia = await bcrypt.hash(contrasenia, 10);

  const sql =
    "INSERT INTO `usuarios` (`nombre`, `apellido` , `nombre_usuario`, `contrasenia`, `tipo_usuario`, `celular`, `foto`) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const params = [
    nombre,
    apellido,
    nombre_usuario,
    encriptarContrasenia,
    tipo_usuario,
    celular,
    foto,
  ];

  const [result] = await conexion.query(sql, params);

  if (result.affectedRows === undefined) {
    throw new Error("No se pudo crear el usuario");
  }

  return true;
};

const listarUsuarios = async () => {
  const [rows] = await conexion.query("SELECT * FROM usuarios");
  return rows;
};

const iniciarSesion = async (nombre_usuario, contrasenia) => {
  const [rows] = await conexion.query(
    "SELECT * FROM usuarios WHERE nombre_usuario = ?",
    [nombre_usuario]
  );

  if (rows.length === 0) {
    return null;
  }

  const usuario = rows[0];

  const esContraseniaValida = await bcrypt.compare(
    contrasenia,
    usuario.contrasenia
  );

  if (!esContraseniaValida) {
    return null;
  }

  const { nombre, apellido, tipo_usuario, celular, foto } = usuario;

  const token = jwt.sign(
    { nombre_usuario, nombre, apellido, tipo_usuario, celular, foto },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return { token };
};

export { crearUsuario, listarUsuarios, iniciarSesion };
