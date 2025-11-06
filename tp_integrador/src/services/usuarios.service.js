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

  crearUsuario = async (usuario) => {
    // Encriptar la contraseña AQUÍ (lógica de negocio)
    const contraseniaEncriptada = await bcrypt.hash(usuario.contrasenia, 10);

    // Preparar el objeto con la contraseña encriptada
    const usuarioConContraseniaEncriptada = {
      ...usuario,
      contrasenia: contraseniaEncriptada,
    };

    return await this.usuarios.crear(usuarioConContraseniaEncriptada);
  };

  actualizarUsuario = async (id, usuario) => {
    const usuarioExistente = await this.usuarios.buscarPorId(id);
    if (!usuarioExistente) return null;
    return await this.usuarios.actualizar(id, usuario);
  };

  eliminarUsuario = async (id) => {
    return await this.usuarios.eliminar(id);
  };

  iniciarSesion = async (nombre_usuario, contrasenia) => {
    // Buscar usuario en la base de datos
    const usuario = await this.usuarios.buscarPorNombreUsuario(nombre_usuario);

    if (!usuario) return null;

    // Validar la contraseña (lógica de negocio)
    const contraseniaValida = await bcrypt.compare(
      contrasenia,
      usuario.contrasenia
    );

    if (!contraseniaValida) return null;

    // Generar el token JWT AQUÍ (lógica de negocio)
    const token = jwt.sign(
      {
        usuario_id: usuario.usuario_id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        tipo_usuario: usuario.tipo_usuario,
        nombre_usuario: usuario.nombre_usuario,
        celular: usuario.celular,
        foto: usuario.foto,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Retornar usuario sin la contraseña
    const { contrasenia: _, ...usuarioSinContrasenia } = usuario;

    return {
      token,
      usuario: usuarioSinContrasenia,
    };
  };
}
