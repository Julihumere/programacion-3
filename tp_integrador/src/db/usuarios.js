import { conexion } from "../db/db.js";

export default class Usuarios {
  buscarTodos = async () => {
    const sql = "SELECT * FROM usuarios WHERE activo = 1";
    const [usuarios] = await conexion.execute(sql);

    if (usuarios.length === 0) return null;

    return usuarios;
  };

  buscarClientes = async () => {
    const sql = "SELECT * FROM usuarios WHERE tipo_usuario = 3 AND activo = 1";
    const [clientes] = await conexion.execute(sql);
    if (clientes.length === 0) return null;
    return clientes;
  };

  buscarPorId = async (id) => {
    const sql = "SELECT * FROM usuarios WHERE usuario_id = ? AND activo = 1";
    const [usuario] = await conexion.execute(sql, [id]);

    if (usuario.length === 0) return null;

    return usuario[0];
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

  buscarEmailsAdministradores = async () => {
    const sql =
      "SELECT nombre_usuario FROM usuarios WHERE tipo_usuario = 1 AND activo = 1";
    const [administradores] = await conexion.execute(sql);
    if (administradores.length === 0) return [];
    return administradores.map((administrador) => administrador.nombre_usuario);
  };

  buscarEliminado = async (id) => {
    const sql = "SELECT * FROM usuarios WHERE usuario_id = ? AND activo = 0";
    const [usuario] = await conexion.execute(sql, [id]);

    if (usuario.length === 0) return null;

    return usuario[0];
  };
}
