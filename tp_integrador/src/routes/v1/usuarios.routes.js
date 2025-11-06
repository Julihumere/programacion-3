import UsuariosController from "../../controllers/usuarios.controller.js";
import { Router } from "express";
import validarSesion from "../../middlewares/validarSesion.js";
import esAdmin from "../../middlewares/esAdmin.js";

const usuariosController = new UsuariosController();

const router = Router();

router.get(
  "/ver_clientes",
  validarSesion,
  esAdmin,
  usuariosController.listarClientes
);

export { router };
