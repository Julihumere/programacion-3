import { Router } from "express";
import InformesController from "../../controllers/informes.controller.js";
import validarSesion from "../../middlewares/validarSesion.js";
import { autorizarUsuarios } from "../../middlewares/autorizarUsuarios.js";

const informesController = new InformesController();

const router = Router();

router.get(
  "/reservas",
  validarSesion,
  autorizarUsuarios([1]),
  informesController.obtenerInformeReservas
);

router.get(
  "/descargar",
  validarSesion,
  autorizarUsuarios([1]),
  informesController.descargarInformePDF
);

export { router };
