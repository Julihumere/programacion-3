import UsuariosController from "../../controllers/usuarios.controller.js";
import { Router } from "express";
import validarSesion from "../../middlewares/validarSesion.js";
import {
  validarCrearUsuario,
  validarIniciarSesion,
} from "../../middlewares/validarCampos.js";

const usuariosController = new UsuariosController();

const router = Router();

/**
 * @swagger
 * /usuarios/registrar:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioRegistro'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Usuario registrado correctamente
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         description: Error interno del servidor
 */
router.post("/registrar", validarCrearUsuario, usuariosController.crearUsuario);

/**
 * @swagger
 * /usuarios/iniciar_sesion:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Usuarios]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Sesión iniciada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticación
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error interno del servidor
 */
router.post(
  "/iniciar_sesion",
  validarIniciarSesion,
  usuariosController.iniciarSesion
);

/**
 * @swagger
 * /usuarios/ver_usuarios:
 *   get:
 *     summary: Listar todos los usuarios
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         description: Error interno del servidor
 */
router.get("/ver_usuarios", validarSesion, usuariosController.listarUsuarios);

export default router;
