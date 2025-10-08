import { Router } from "express";
import {
  crearSalonController,
  listarSalonesController,
  obtenerSalonController,
  actualizarSalonController,
  eliminarSalonController,
} from "../controllers/salones.controller.js";
import esAdmin from "../utils/esAdmin.js";
import { validarSesion } from "../middlewares/validarSesion.js";

const router = Router();

router.post("/", validarSesion, esAdmin, crearSalonController);
router.get("/", validarSesion, listarSalonesController);
router.get("/:id", validarSesion, obtenerSalonController);
router.put("/:id", validarSesion, esAdmin, actualizarSalonController);
router.delete("/:id", validarSesion, esAdmin, eliminarSalonController);
export default router;
