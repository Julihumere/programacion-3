import { Router } from "express";
import {
  crearTurnoController,
  listarTurnosController,
  obtenerTurnoController,
  actualizarTurnoController,
  eliminarTurnoController,
} from "../controllers/turnos.controller.js";
import esAdmin from "../utils/esAdmin.js";
import { validarSesion } from "../middlewares/validarSesion.js";

const router = Router();

router.post("/", validarSesion, esAdmin, crearTurnoController);
router.get("/", validarSesion, listarTurnosController);
router.get("/:id", validarSesion, obtenerTurnoController);
router.put("/:id", validarSesion, esAdmin, actualizarTurnoController);
router.delete("/:id", validarSesion, esAdmin, eliminarTurnoController);

export default router;
