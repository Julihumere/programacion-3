import {
  crearUsuarioController,
  listarUsuariosController,
  iniciarSesionController,
} from "../controllers/usuarios.controller.js";
import { Router } from "express";
import { validarSesion } from "../middlewares/validarSesion.js";

const router = Router();

router.post("/registrar", crearUsuarioController);
router.post("/iniciar_sesion", iniciarSesionController);
router.get("/ver_usuarios", validarSesion, listarUsuariosController);

export default router;
