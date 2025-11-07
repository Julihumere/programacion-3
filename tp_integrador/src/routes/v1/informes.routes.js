import { Router } from "express";
import InformesController from "../../controllers/informes.controller.js";
import esAdmin from "../../middlewares/esAdmin.js";
import validarSesion from "../../middlewares/validarSesion.js";

const informesController = new InformesController();

const router = Router();

router.get(
  "/reservas",
  validarSesion,
  esAdmin,
  informesController.obtenerInformeReservas
);

router.get(
  "/descargar",
  validarSesion,
  esAdmin,
  informesController.descargarInformePDF
);

export { router };
