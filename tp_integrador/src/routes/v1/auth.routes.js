import AuthController from "../../controllers/auth.controller.js";
import { Router } from "express";
import validarSesion from "../../middlewares/validarSesion.js";
import {
  validarCrearUsuario,
  validarIniciarSesion,
} from "../../middlewares/validarCampos.js";

const authController = new AuthController();

const router = Router();

router.post("/registrar", validarCrearUsuario, authController.crearUsuario);

router.post(
  "/iniciar_sesion",
  validarIniciarSesion,
  authController.iniciarSesion
);

export { router };
