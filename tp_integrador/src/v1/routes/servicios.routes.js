import { Router } from "express";
import ServiciosController from "../../controllers/servicios.controller.js";
import esAdmin from "../../utils/esAdmin.js";
import { validarSesion } from "../../middlewares/validarSesion.js";
import { validarCrearServicio } from "../../middlewares/validarCampos.js";
import apicache from "apicache";
const cache = apicache.middleware;

const serviciosController = new ServiciosController();

const router = Router();

router.get(
  "/",
  cache("5 minutes"),
  validarSesion,
  serviciosController.listarServicios
);
router.get(
  "/:id",
  cache("5 minutes"),
  validarSesion,
  serviciosController.obtenerServicio
);
router.post(
  "/",
  validarCrearServicio,
  validarSesion,
  esAdmin,
  serviciosController.crearServicio
);
router.patch(
  "/:id",
  validarSesion,
  esAdmin,
  serviciosController.actualizarServicio
);
router.delete(
  "/:id",
  validarSesion,
  esAdmin,
  serviciosController.eliminarServicio
);

export { router };
