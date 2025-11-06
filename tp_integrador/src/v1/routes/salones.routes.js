import { Router } from "express";
import SalonesController from "../../controllers/salones.controller.js";
import esAdmin from "../../middlewares/esAdmin.js";
import validarSesion from "../../middlewares/validarSesion.js";
import { validarCrearSalon } from "../../middlewares/validarCampos.js";
import apicache from "apicache";
const cache = apicache.middleware;

const salonesController = new SalonesController();

const router = Router();

/**
 * @swagger
 * /salones:
 *   get:
 *     summary: Listar todos los salones
 *     tags: [Salones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de salones obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Salon'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         description: Error interno del servidor
 */
router.get(
  "/",
  cache("5 minutes"),
  validarSesion,
  salonesController.listarSalones
);

/**
 * @swagger
 * /salones/{id}:
 *   get:
 *     summary: Obtener un salón por ID
 *     tags: [Salones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del salón
 *     responses:
 *       200:
 *         description: Salón obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Salon'
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
  salonesController.obtenerSalon
);

/**
 * @swagger
 * /salones:
 *   post:
 *     summary: Crear un nuevo salón (solo administradores)
 *     tags: [Salones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearSalon'
 *     responses:
 *       201:
 *         description: Salón creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Salon'
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
  validarCrearSalon,
  validarSesion,
  esAdmin,
  salonesController.crearSalon
);

/**
 * @swagger
 * /salones/{id}:
 *   patch:
 *     summary: Actualizar un salón (solo administradores)
 *     tags: [Salones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del salón a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               capacidad:
 *                 type: integer
 *               precio:
 *                 type: number
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Salón actualizado exitosamente
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
router.patch("/:id", validarSesion, esAdmin, salonesController.actualizarSalon);

/**
 * @swagger
 * /salones/{id}:
 *   delete:
 *     summary: Eliminar un salón (solo administradores)
 *     tags: [Salones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del salón a eliminar
 *     responses:
 *       200:
 *         description: Salón eliminado exitosamente
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
router.delete("/:id", validarSesion, esAdmin, salonesController.eliminarSalon);

export { router };
