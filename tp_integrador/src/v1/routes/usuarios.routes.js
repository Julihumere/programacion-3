import { UsuariosController } from "../../controllers/usuarios.controller.js";
import { Router } from "express";
import validarSesion from "../../middlewares/validarSesion.js";
import {
  validarCrearUsuario,
  validarIniciarSesion,
} from "../../middlewares/validarCampos.js";

const usuariosController = new UsuariosController();

const router = Router();

router.post("/registrar", validarCrearUsuario, usuariosController.crearUsuario);
router.post(
  "/iniciar_sesion",
  validarIniciarSesion,
  usuariosController.iniciarSesion
);
router.get("/ver_usuarios", validarSesion, usuariosController.listarUsuarios);

export default router;
