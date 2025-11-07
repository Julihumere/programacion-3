process.loadEnvFile();
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import AuthService from "../services/auth.service.js";
import UsuariosService from "../services/usuarios.service.js";

// Estrategia de JWT
const estrategiaJwt = new LocalStrategy(
  {
    usernameField: "nombre_usuario",
    passwordField: "contrasenia",
  },
  async (nombre_usuario, contrasenia, done) => {
    try {
      const authService = new AuthService();
      const usuario = await authService.iniciarSesion(
        nombre_usuario,
        contrasenia
      );
      if (!usuario) {
        return done(null, false, { mensaje: "Credenciales incorrectas" });
      }
      return done(null, usuario, { mensaje: "Sesión iniciada correctamente" });
    } catch (error) {
      return done(error);
    }
  }
);

// Validación local
const validacion = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (jwtPayload, done) => {
    const usuarioServicio = new UsuariosService();
    const usuario = await usuarioServicio.obtenerUsuario(
      jwtPayload.usuario.usuario_id
    );
    if (!usuario) {
      return done(null, false, { mensaje: "Token inválido o expirado" });
    }
    return done(null, usuario, { mensaje: "Sesión iniciada correctamente" });
  }
);

export { estrategiaJwt, validacion };
