import { conexion } from "./db.js";
import bcrypt from "bcrypt";

export default class Usuarios {
  buscarTodos = async () => {
    const sql = "SELECT * FROM usuarios WHERE activo = 1";
    const [usuarios] = await conexion.execute(sql);

    if (usuarios.length === 0) return null;

    return usuarios;
  };

  buscarPorId = async (id) => {
    const sql = "SELECT * FROM usuarios WHERE usuario_id = ? AND activo = 1";
    const [usuario] = await conexion.execute(sql, [id]);

    if (usuario.length === 0) return null;

    return usuario[0];
  };

  crear = async (usuario) => {
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
      "INSERT INTO usuarios (nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, celular, foto) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const [result] = await conexion.execute(sql, [
      nombre,
      apellido,
      nombre_usuario,
      encriptarContrasenia,
      tipo_usuario,
      celular,
      foto,
    ]);

    if (result.affectedRows === undefined) return null;

    return result;
  };

  actualizar = async (id, usuario) => {
    const campos = Object.keys(usuario);
    const valores = Object.values(usuario);

    const setValores = campos.map((campo) => `${campo} = ?`).join(", ");
    const parametros = [...valores, Number(id)];

    const sql = `UPDATE usuarios SET ${setValores} WHERE usuario_id = ?`;

    const [result] = await conexion.execute(sql, parametros);

    if (result.affectedRows === 0) return null;

    return this.buscarPorId(id);
  };

  eliminar = async (id) => {
    const sql = "UPDATE usuarios SET activo = 0 WHERE usuario_id = ?";
    const [result] = await conexion.execute(sql, [id]);

    if (result.affectedRows === 0) return null;

    return result;
  };

  iniciarSesion = async (nombre_usuario, contrasenia) => {
    const sql =
      "SELECT * FROM usuarios WHERE nombre_usuario = ? AND activo = 1";
    const [usuario] = await conexion.execute(sql, [nombre_usuario]);
    if (usuario.length === 0) return null;
    const contraseniaValida = await bcrypt.compare(
      contrasenia,
      usuario[0].contrasenia
    );
    if (!contraseniaValida) return null;
    return usuario[0];
  };
}
