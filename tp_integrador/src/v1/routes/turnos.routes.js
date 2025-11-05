import { Router } from "express";
import TurnosController from "../../controllers/turnos.controller.js";
import esAdmin from "../../utils/esAdmin.js";
import validarSesion from "../../middlewares/validarSesion.js";
import { validarCrearTurno } from "../../middlewares/validarCampos.js";
import apicache from "apicache";
const cache = apicache.middleware;

const turnosController = new TurnosController();

const router = Router();

/**
 * @swagger
 * /turnos:
 *   get:
 *     summary: Listar todos los turnos
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de turnos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Turno'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         description: Error interno del servidor
 */
router.get(
  "/",
  cache("5 minutes"),
  validarSesion,
  turnosController.listarTurnos
);

/**
 * @swagger
 * /turnos/{id}:
 *   get:
 *     summary: Obtener un turno por ID
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del turno
 *     responses:
 *       200:
 *         description: Turno obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Turno'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         description: Error interno del servidor
 */
router.get(
  "/:id",
  cache("5 minutes"),
  validarSesion,
  turnosController.obtenerTurno
);

/**
 * @swagger
 * /turnos:
 *   post:
 *     summary: Crear un nuevo turno (solo administradores)
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearTurno'
 *     responses:
 *       201:
 *         description: Turno creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Turno'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         description: Error interno del servidor
 */
router.post(
  "/",
  validarCrearTurno,
  validarSesion,
  esAdmin,
  turnosController.crearTurno
);

/**
 * @swagger
 * /turnos/{id}:
 *   patch:
 *     summary: Actualizar un turno (solo administradores)
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del turno a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date
 *               horaInicio:
 *                 type: string
 *                 format: time
 *               horaFin:
 *                 type: string
 *                 format: time
 *               disponible:
 *                 type: boolean
 *               salonId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Turno actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         description: Error interno del servidor
 */
router.patch("/:id", validarSesion, esAdmin, turnosController.actualizarTurno);

/**
 * @swagger
 * /turnos/{id}:
 *   delete:
 *     summary: Eliminar un turno (solo administradores)
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del turno a eliminar
 *     responses:
 *       200:
 *         description: Turno eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:id", validarSesion, esAdmin, turnosController.eliminarTurno);

export default router;
