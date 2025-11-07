import passport from "passport";
import AuthService from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import {
  mensajeError500,
  mensajeError400,
  mensajeError401,
} from "../utils/mensajes.js";

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
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err || !user) {
        return res
          .status(401)
          .json(mensajeError401("Credenciales incorrectas"));
      }

      req.login(user, { session: false }, (err) => {
        if (err) {
          return res.status(500).json(mensajeError500(err));
        }

        const token = jwt.sign(
          { usuario: user.usuario },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        return res.status(200).json({
          estado: "success",
          mensaje: "Sesión iniciada correctamente",
          token: token,
          usuario: user.usuario,
        });
      });
    })(req, res);
  };
}
