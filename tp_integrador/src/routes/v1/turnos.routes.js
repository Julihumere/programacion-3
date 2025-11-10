import { Router } from "express";
import TurnosController from "../../controllers/turnos.controller.js";
import validarSesion from "../../middlewares/validarSesion.js";
import { validarCrearTurno } from "../../middlewares/validarCampos.js";
import { autorizarUsuarios } from "../../middlewares/autorizarUsuarios.js";

const turnosController = new TurnosController();

const router = Router();

router.get(
  "/",
  validarSesion,
  autorizarUsuarios([1, 2, 3]),
  turnosController.listarTurnos
);

router.get(
  "/:id",
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
