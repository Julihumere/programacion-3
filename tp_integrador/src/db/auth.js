import { conexion } from "../db/db.js";
import bcrypt from "bcrypt";

export default class Auth {
  buscarPorId = async (id) => {
    const sql = "SELECT * FROM usuarios WHERE usuario_id = ? AND activo = 1";
    const [result] = await conexion.execute(sql, [id]);
    if (result.length === 0) return null;
    return result[0];
  };

  crear = async (usuario) => {
    const sql =
      "INSERT INTO usuarios (nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, celular, foto) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const [result] = await conexion.execute(sql, [
      usuario.nombre,
      usuario.apellido,
      usuario.nombre_usuario,
      usuario.contrasenia, // Ya debe venir encriptada desde el Service
      usuario.tipo_usuario ?? 3, // Por defecto, el tipo de usuario es 3 (Cliente)
      usuario.celular,
      usuario.foto,
    ]);

    if (result.affectedRows === undefined) return null;

    return result;
  };

  iniciarSesion = async (nombre_usuario) => {
    const sql =
      "SELECT * FROM usuarios WHERE nombre_usuario = ? AND activo = 1";
    const [result] = await conexion.execute(sql, [nombre_usuario]);
    if (result.length === 0) return null;

    return result[0];
  };
}
