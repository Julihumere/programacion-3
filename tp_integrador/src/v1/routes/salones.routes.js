import { Router } from "express";
import SalonesController from "../../controllers/salones.controller.js";
import esAdmin from "../../middlewares/esAdmin.js";
import validarSesion from "../../middlewares/validarSesion.js";
import { validarCrearSalon } from "../../middlewares/validarCampos.js";
import apicache from "apicache";
const cache = apicache.middleware;

const salonesController = new SalonesController();

const router = Router();

router.get(
  "/",
  cache("5 minutes"),
  validarSesion,
  salonesController.listarSalones
);

router.get(
  "/:id",
  cache("5 minutes"),
  validarSesion,
  salonesController.obtenerSalon
);

router.post(
  "/",
  validarCrearSalon,
  validarSesion,
  esAdmin,
  salonesController.crearSalon
);

router.patch("/:id", validarSesion, esAdmin, salonesController.actualizarSalon);

router.delete("/:id", validarSesion, esAdmin, salonesController.eliminarSalon);

export { router };
