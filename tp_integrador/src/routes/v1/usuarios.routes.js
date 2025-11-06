import UsuariosController from "../../controllers/usuarios.controller.js";
import { Router } from "express";
import validarSesion from "../../middlewares/validarSesion.js";
import esEmpleadoOAdmin from "../../middlewares/esEmpleadoOAdmin.js";

const usuariosController = new UsuariosController();

const router = Router();

router.get(
  "/listar_clientes",
  validarSesion,
  esEmpleadoOAdmin,
  usuariosController.listarClientes
);

export { router };
