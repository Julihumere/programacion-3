import { Router } from "express";
import TurnosController from "../../controllers/turnos.controller.js";
import validarSesion from "../../middlewares/validarSesion.js";
import { validarCrearTurno } from "../../middlewares/validarCampos.js";
import apicache from "apicache";
import { autorizarUsuarios } from "../../middlewares/autorizarUsuarios.js";
const cache = apicache.middleware;

const turnosController = new TurnosController();

const router = Router();

router.get(
  "/",
  cache("5 minutes"),
  validarSesion,
  autorizarUsuarios([1, 2, 3]),
  turnosController.listarTurnos
);

router.get(
  "/:id",
  cache("5 minutes"),
  validarSesion,
  autorizarUsuarios([1, 2, 3]),
  turnosController.obtenerTurno
);

router.post(
  "/",
  validarCrearTurno,
  validarSesion,
  autorizarUsuarios([1, 2]),
  turnosController.crearTurno
);

router.patch(
  "/:id",
  validarSesion,
  autorizarUsuarios([1, 2]),
  turnosController.actualizarTurno
);

router.delete(
  "/:id",
  validarSesion,
  autorizarUsuarios([1, 2]),
  turnosController.eliminarTurno
);

export { router };
