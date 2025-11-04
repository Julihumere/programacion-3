import { Router } from "express";
import {
  crearServicioController,
  listarServiciosController,
  obtenerServicioController,
  actualizarServicioController,
  eliminarServicioController,
} from "../../controllers/servicios.controller.js";
import esAdmin from "../../utils/esAdmin.js";
import { validarSesion } from "../../middlewares/validarSesion.js";

const router = Router();

router.post("/", validarSesion, esAdmin, crearServicioController);
router.get("/", validarSesion, listarServiciosController);
router.get("/:id", validarSesion, obtenerServicioController);
router.patch("/:id", validarSesion, esAdmin, actualizarServicioController);
router.delete("/:id", validarSesion, esAdmin, eliminarServicioController);

export default router;
