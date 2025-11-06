import { Router } from "express";
import ReservasController from "../../controllers/reservas.controller.js";
import esAdmin from "../../middlewares/esAdmin.js";
import esEmpleadoOAdmin from "../../middlewares/esEmpleadoOAdmin.js";
import validarSesion from "../../middlewares/validarSesion.js";
import { validarCrearReserva } from "../../middlewares/validarCampos.js";

const reservasController = new ReservasController();

const router = Router();

// ========== RUTAS BREAD DE RESERVAS ==========

router.get(
  "/",
  validarSesion,
  esEmpleadoOAdmin,
  reservasController.listarReservas
);

router.get(
  "/mis-reservas",
  validarSesion,
  reservasController.listarMisReservas
);

router.get(
  "/:id",
  validarSesion,
  esEmpleadoOAdmin,
  reservasController.obtenerReserva
);

router.post(
  "/",
  validarCrearReserva,
  validarSesion,
  reservasController.crearReserva
);

router.patch(
  "/:id",
  validarSesion,
  esAdmin,
  reservasController.actualizarReserva
);

router.delete(
  "/:id",
  validarSesion,
  esAdmin,
  reservasController.eliminarReserva
);

// ========== RUTAS PARA GESTIONAR SERVICIOS DE UNA RESERVA ==========

router.get(
  "/:id/servicios",
  validarSesion,
  esEmpleadoOAdmin,
  reservasController.obtenerServiciosReserva
);

router.post(
  "/:id/servicios",
  validarSesion,
  esAdmin,
  reservasController.agregarServicioReserva
);

router.delete(
  "/:reserva_id/servicios/:servicio_id",
  validarSesion,
  esAdmin,
  reservasController.eliminarServicioReserva
);

export { router };
