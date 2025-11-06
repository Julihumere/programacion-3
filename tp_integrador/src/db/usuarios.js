import { conexion } from "../db/db.js";

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

  buscarPorNombreUsuario = async (nombre_usuario) => {
    const sql = "SELECT * FROM usuarios WHERE nombre_usuario = ? AND activo = 1";
    const [usuario] = await conexion.execute(sql, [nombre_usuario]);

    if (usuario.length === 0) return null;

    return usuario[0];
  };

  crear = async (usuario) => {
    const sql =
      "INSERT INTO usuarios (nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, celular, foto) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const [result] = await conexion.execute(sql, [
      usuario.nombre,
      usuario.apellido,
      usuario.nombre_usuario,
      usuario.contrasenia, // Ya debe venir encriptada desde el Service
      usuario.tipo_usuario,
      usuario.celular,
      usuario.foto,
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
}
