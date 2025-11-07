import { Router } from "express";
import ReservasController from "../../controllers/reservas.controller.js";
import validarSesion from "../../middlewares/validarSesion.js";
import { validarCrearReserva } from "../../middlewares/validarCampos.js";
import { autorizarUsuarios } from "../../middlewares/autorizarUsuarios.js";
import multer from "multer";
import { storageFotosCumpleaniero } from "../../config/multer.js";

const reservasController = new ReservasController();

const router = Router();
const uploadFotosCumpleaniero = multer({ storage: storageFotosCumpleaniero });

// ========== RUTAS BREAD DE RESERVAS ==========

router.get(
  "/",
  validarSesion,
  autorizarUsuarios([1, 2]),
  reservasController.listarReservas
);

router.get(
  "/mis-reservas",
  validarSesion,
  autorizarUsuarios([3]),
  reservasController.listarMisReservas
);

router.get(
  "/:id",
  validarSesion,
  autorizarUsuarios([1, 2]),
  reservasController.obtenerReserva
);

router.post(
  "/",
  uploadFotosCumpleaniero.single("foto_cumpleaniero"),
  validarCrearReserva,
  validarSesion,
  autorizarUsuarios([1, 3]),
  reservasController.crearReserva
);

router.patch(
  "/:id",
  validarSesion,
  autorizarUsuarios([1]),
  reservasController.actualizarReserva
);

router.delete(
  "/:id",
  validarSesion,
  autorizarUsuarios([1]),
  reservasController.eliminarReserva
);

// ========== RUTAS PARA GESTIONAR SERVICIOS DE UNA RESERVA ==========

router.get(
  "/:id/servicios",
  validarSesion,
  autorizarUsuarios([1, 2]),
  reservasController.obtenerServiciosReserva
);

router.post(
  "/:id/servicios",
  validarSesion,
  autorizarUsuarios([1, 2]),
  reservasController.agregarServicioReserva
);

router.delete(
  "/:reserva_id/servicios/:servicio_id",
  validarSesion,
  autorizarUsuarios([1, 2]),
  reservasController.eliminarServicioReserva
);

export { router };
