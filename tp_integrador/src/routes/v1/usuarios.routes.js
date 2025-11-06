import UsuariosController from "../../controllers/usuarios.controller.js";
import { Router } from "express";
import validarSesion from "../../middlewares/validarSesion.js";

const usuariosController = new UsuariosController();

const router = Router();

router.get("/ver_usuarios", validarSesion, usuariosController.listarUsuarios);

export { router };
