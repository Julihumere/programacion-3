import {
  crearUsuarioController,
  listarUsuariosController,
  iniciarSesionController,
} from "../../controllers/usuarios.controller.js";
import { Router } from "express";
import { validarSesion } from "../../middlewares/validarSesion.js";
import {
  validarCrearUsuario,
  validarIniciarSesion,
} from "../../middlewares/validarCampos.js";

const router = Router();

router.post("/registrar", validarCrearUsuario, crearUsuarioController);
router.post("/iniciar_sesion", validarIniciarSesion, iniciarSesionController);
router.get("/ver_usuarios", validarSesion, listarUsuariosController);

export default router;
