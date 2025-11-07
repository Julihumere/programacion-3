import { Router } from "express";
import SalonesController from "../../controllers/salones.controller.js";
import validarSesion from "../../middlewares/validarSesion.js";
import { validarCrearSalon } from "../../middlewares/validarCampos.js";
import apicache from "apicache";
import { autorizarUsuarios } from "../../middlewares/autorizarUsuarios.js";
const cache = apicache.middleware;

const salonesController = new SalonesController();

const router = Router();

router.get(
  "/",
  cache("5 minutes"),
  validarSesion,
  autorizarUsuarios([1, 2, 3]),
  salonesController.listarSalones
);

router.get(
  "/:id",
  cache("5 minutes"),
  validarSesion,
  autorizarUsuarios([1, 2, 3]),
  salonesController.obtenerSalon
);

router.post(
  "/",
  validarCrearSalon,
  validarSesion,
  autorizarUsuarios([1, 2]),
  salonesController.crearSalon
);

router.patch(
  "/:id",
  validarSesion,
  autorizarUsuarios([1, 2]),
  salonesController.actualizarSalon
);

router.delete(
  "/:id",
  validarSesion,
  autorizarUsuarios([1, 2]),
  salonesController.eliminarSalon
);

export { router };
