import { Router } from "express";
import TurnosController from "../../controllers/turnos.controller.js";
import esAdmin from "../../utils/esAdmin.js";
import { validarSesion } from "../../middlewares/validarSesion.js";
import { validarCrearTurno } from "../../middlewares/validarCampos.js";
import apicache from "apicache";
const cache = apicache.middleware;

const turnosController = new TurnosController();

const router = Router();

router.get(
  "/",
  cache("5 minutes"),
  validarSesion,
  turnosController.listarTurnos
);
router.get(
  "/:id",
  cache("5 minutes"),
  validarSesion,
  turnosController.obtenerTurno
);
router.post(
  "/",
  validarCrearTurno,
  validarSesion,
  esAdmin,
  turnosController.crearTurno
);
router.patch("/:id", validarSesion, esAdmin, turnosController.actualizarTurno);
router.delete("/:id", validarSesion, esAdmin, turnosController.eliminarTurno);

export default router;
