import { Router } from "express";
import ReservasController from "../../controllers/reservas.controller.js";
import esAdmin from "../../middlewares/esAdmin.js";
import esEmpleadoOAdmin from "../../middlewares/esEmpleadoOAdmin.js";
import validarSesion from "../../middlewares/validarSesion.js";
import { validarCrearReserva } from "../../middlewares/validarCampos.js";
import apicache from "apicache";
const cache = apicache.middleware;

const reservasController = new ReservasController();

const router = Router();

// ========== RUTAS BREAD DE RESERVAS ==========

/**
 * @swagger
 * /reservas:
 *   get:
 *     summary: Listar todas las reservas (Solo Empleados y Administradores)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todas las reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Reserva'
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado (solo empleados y administradores)
 */
router.get(
  "/",
  cache("5 minutes"),
  validarSesion,
  esEmpleadoOAdmin,
  reservasController.listarReservas
);

/**
 * @swagger
 * /reservas/mis-reservas:
 *   get:
 *     summary: Listar mis reservas (usuario autenticado)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas del usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Reserva'
 *       401:
 *         description: No autenticado
 */
router.get(
  "/mis-reservas",
  cache("5 minutes"),
  validarSesion,
  reservasController.listarMisReservas
);

/**
 * @swagger
 * /reservas/{id}:
 *   get:
 *     summary: Obtener una reserva por ID (Solo Empleados y Administradores)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Datos de la reserva
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: success
 *                 data:
 *                   $ref: '#/components/schemas/Reserva'
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado (solo empleados y administradores)
 *       404:
 *         description: Reserva no encontrada
 */
router.get(
  "/:id",
  cache("5 minutes"),
  validarSesion,
  esEmpleadoOAdmin,
  reservasController.obtenerReserva
);

/**
 * @swagger
 * /reservas:
 *   post:
 *     summary: Crear una nueva reserva
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearReserva'
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: success
 *                 mensaje:
 *                   type: string
 *                   example: Reserva creada correctamente
 *                 data:
 *                   $ref: '#/components/schemas/Reserva'
 *       400:
 *         description: Datos inválidos o turno no disponible
 *       401:
 *         description: No autenticado
 */
router.post(
  "/",
  validarCrearReserva,
  validarSesion,
  reservasController.crearReserva
);

/**
 * @swagger
 * /reservas/{id}:
 *   patch:
 *     summary: Actualizar una reserva (Solo Administradores)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tematica:
 *                 type: string
 *                 example: Superhéroes
 *               foto_cumpleaniero:
 *                 type: string
 *                 example: https://example.com/foto.jpg
 *               activo:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Reserva actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado (solo administradores)
 *       404:
 *         description: Reserva no encontrada
 */
router.patch(
  "/:id",
  validarSesion,
  esAdmin,
  reservasController.actualizarReserva
);

/**
 * @swagger
 * /reservas/{id}:
 *   delete:
 *     summary: Eliminar una reserva (Solo Administradores)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Reserva eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado (solo administradores)
 *       404:
 *         description: Reserva no encontrada
 */
router.delete(
  "/:id",
  validarSesion,
  esAdmin,
  reservasController.eliminarReserva
);

// ========== RUTAS PARA GESTIONAR SERVICIOS DE UNA RESERVA ==========

/**
 * @swagger
 * /reservas/{id}/servicios:
 *   get:
 *     summary: Obtener servicios de una reserva (Solo Empleados y Administradores)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Lista de servicios de la reserva
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       reserva_servicio_id:
 *                         type: integer
 *                       servicio_id:
 *                         type: integer
 *                       importe:
 *                         type: number
 *                       servicio_descripcion:
 *                         type: string
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado (solo empleados y administradores)
 *       404:
 *         description: Reserva no encontrada
 */
router.get(
  "/:id/servicios",
  validarSesion,
  esEmpleadoOAdmin,
  reservasController.obtenerServiciosReserva
);

/**
 * @swagger
 * /reservas/{id}/servicios:
 *   post:
 *     summary: Agregar un servicio a una reserva (Solo Administradores)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AgregarServicioReserva'
 *     responses:
 *       201:
 *         description: Servicio agregado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 estado:
 *                   type: string
 *                   example: success
 *                 mensaje:
 *                   type: string
 *                   example: Servicio agregado a la reserva
 *       400:
 *         description: Servicio ya existe en la reserva
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado (solo administradores)
 *       404:
 *         description: Reserva o servicio no encontrado
 */
router.post(
  "/:id/servicios",
  validarSesion,
  esAdmin,
  reservasController.agregarServicioReserva
);

/**
 * @swagger
 * /reservas/{id}/servicios/{servicio_id}:
 *   delete:
 *     summary: Eliminar un servicio de una reserva (Solo Administradores)
 *     tags: [Reservas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la reserva
 *       - in: path
 *         name: servicio_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del servicio a eliminar
 *     responses:
 *       200:
 *         description: Servicio eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado (solo administradores)
 *       404:
 *         description: Servicio no encontrado en la reserva
 */
router.delete(
  "/:id/servicios/:servicio_id",
  validarSesion,
  esAdmin,
  reservasController.eliminarServicioReserva
);

export { router };
