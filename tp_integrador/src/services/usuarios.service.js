import Usuarios from "../db/usuarios.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default class UsuariosService {
  constructor() {
    this.usuarios = new Usuarios();
  }

  listarUsuarios = async () => {
    return await this.usuarios.buscarTodos();
  };

  obtenerUsuario = async (id) => {
    return await this.usuarios.buscarPorId(id);
  };

  actualizarUsuario = async (id, usuario) => {
    const usuarioExistente = await this.usuarios.buscarPorId(id);
    if (!usuarioExistente) return null;
    return await this.usuarios.actualizar(id, usuario);
  };

  eliminarUsuario = async (id) => {
    return await this.usuarios.eliminar(id);
  };
}
