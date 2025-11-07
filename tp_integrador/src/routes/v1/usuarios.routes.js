import UsuariosController from "../../controllers/usuarios.controller.js";
import { Router } from "express";
import validarSesion from "../../middlewares/validarSesion.js";
import { autorizarUsuarios } from "../../middlewares/autorizarUsuarios.js";
import multer from "multer";
import { storage } from "../../config/multer.js";

const usuariosController = new UsuariosController();

const router = Router();

const upload = multer({ storage });

router.get(
  "/clientes",
  validarSesion,
  autorizarUsuarios([1, 2]),
  usuariosController.listarClientes
);

router.get(
  "/",
  validarSesion,
  autorizarUsuarios([1]),
  usuariosController.listarUsuarios
);

router.get(
  "/:id",
  validarSesion,
  autorizarUsuarios([1]),
  usuariosController.obtenerUsuario
);

router.patch(
  "/:id",
  validarSesion,
  upload.single("foto"),
  autorizarUsuarios([3]),
  usuariosController.actualizarUsuario
);

export { router };
