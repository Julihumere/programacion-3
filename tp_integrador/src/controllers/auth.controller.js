import AuthService from "../services/auth.service.js";
import { mensajeError500, mensajeError400 } from "../utils/mensajes.js";

export default class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  crearUsuario = async (req, res) => {
    try {
      const usuario = await this.authService.crearUsuario(req.body);
      if (!usuario) {
        return res
          .status(400)
          .json(mensajeError400("No se pudo crear el usuario"));
      }
      return res.status(201).json({
        estado: "success",
        mensaje: "Usuario creado correctamente",
        token: usuario.token,
        usuario: usuario.usuario,
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };

  iniciarSesion = async (req, res) => {
    try {
      const { nombre_usuario, contrasenia } = req.body;
      const resultado = await this.authService.iniciarSesion(
        nombre_usuario,
        contrasenia
      );

      if (!resultado) {
        return res
          .status(400)
          .json(mensajeError400("Credenciales incorrectas"));
      }
      return res.status(200).json({
        estado: "success",
        mensaje: "Sesión iniciada correctamente",
        token: resultado.token,
        usuario: resultado.usuario,
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };
}
