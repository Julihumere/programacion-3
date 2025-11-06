import Auth from "../db/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default class AuthService {
  constructor() {
    this.auth = new Auth();
  }
  crearUsuario = async (usuario) => {
    // Encriptar la contraseña AQUÍ (lógica de negocio)
    const contraseniaEncriptada = await bcrypt.hash(usuario.contrasenia, 10);

    // Preparar el objeto con la contraseña encriptada
    const usuarioConContraseniaEncriptada = {
      ...usuario,
      contrasenia: contraseniaEncriptada,
    };

    const nuevoUsuario = await this.auth.crear(usuarioConContraseniaEncriptada);
    if (!nuevoUsuario) return null;

    const usuarioInsertado = await this.auth.buscarPorId(nuevoUsuario.insertId);
    if (!usuarioInsertado) return null;

    const token = jwt.sign(
      { usuario_id: usuarioInsertado.usuario_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const { contrasenia: _, ...usuarioSinContrasenia } = usuarioInsertado;
    return {
      token,
      usuario: usuarioSinContrasenia,
    };
  };
  iniciarSesion = async (nombre_usuario, contrasenia) => {
    const usuario = await this.auth.iniciarSesion(nombre_usuario, contrasenia);
    if (!usuario) return null;

    const contraseniaValida = await bcrypt.compare(
      contrasenia,
      usuario.contrasenia
    );
    if (!contraseniaValida) return null;

    const token = jwt.sign(
      { usuario_id: usuario.usuario_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const { contrasenia: _, ...usuarioSinContrasenia } = usuario;
    return {
      token,
      usuario: usuarioSinContrasenia,
    };
  };
}
