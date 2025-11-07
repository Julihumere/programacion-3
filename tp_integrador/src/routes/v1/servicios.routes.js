import { Router } from "express";
import ServiciosController from "../../controllers/servicios.controller.js";
import validarSesion from "../../middlewares/validarSesion.js";
import { validarCrearServicio } from "../../middlewares/validarCampos.js";
import apicache from "apicache";
import { autorizarUsuarios } from "../../middlewares/autorizarUsuarios.js";
const cache = apicache.middleware;

const serviciosController = new ServiciosController();

const router = Router();

router.get(
  "/",
  cache("5 minutes"),
  validarSesion,
  autorizarUsuarios([1, 2, 3]),
  serviciosController.listarServicios
);

router.get(
  "/:id",
  cache("5 minutes"),
  validarSesion,
  autorizarUsuarios([1, 2, 3]),
  serviciosController.obtenerServicio
);

router.post(
  "/",
  validarCrearServicio,
  validarSesion,
  autorizarUsuarios([1, 2]),
  serviciosController.crearServicio
);

router.patch(
  "/:id",
  validarSesion,
  autorizarUsuarios([1, 2]),
  serviciosController.actualizarServicio
);

router.delete(
  "/:id",
  validarSesion,
  autorizarUsuarios([1, 2]),
  serviciosController.eliminarServicio
);

export { router };
