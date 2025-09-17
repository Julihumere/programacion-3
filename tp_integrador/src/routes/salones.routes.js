import { Router } from "express";
import {
  crearSalonController,
  listarSalonesController,
  obtenerSalonController,
} from "../controllers/salones.controller.js";
import esAdmin from "../utils/esAdmin.js";
import { validarSesion } from "../middlewares/validarSesion.js";

const router = Router();

router.post("/", validarSesion, esAdmin, crearSalonController);
router.get("/", validarSesion, listarSalonesController);
router.get("/:id", validarSesion, obtenerSalonController);
export default router;
