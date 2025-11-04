import { body, check, validationResult } from "express-validator";
import { mensajeError400 } from "../utils/mensajes.js";

// Middleware para manejar los errores de validación
export const manejarErroresValidacion = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json(mensajeError400(errores.mapped()));
  }
  return next();
};

export const validarCrearUsuario = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El nombre solo puede contener letras"),

  body("apellido")
    .trim()
    .notEmpty()
    .withMessage("El apellido es requerido")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El apellido solo puede contener letras"),

  body("nombre_usuario")
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario es requerido")
    .isLength({ min: 4, max: 30 })
    .withMessage("El nombre de usuario debe tener entre 4 y 30 caracteres")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage(
      "El nombre de usuario solo puede contener letras, números y guiones bajos"
    ),

  body("contrasenia")
    .notEmpty()
    .withMessage("La contraseña es requerida")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),

  body("tipo_usuario").optional().isInt({ min: 1, max: 2 }),

  body("celular")
    .trim()
    .notEmpty()
    .withMessage("El celular es requerido")
    .matches(/^[0-9]{10,15}$/)
    .withMessage("El celular debe contener entre 10 y 15 dígitos"),

  manejarErroresValidacion,
];

export const validarIniciarSesion = [
  body("nombre_usuario")
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario es requerido"),

  body("contrasenia").notEmpty().withMessage("La contraseña es requerida"),

  manejarErroresValidacion,
];

export const validarCrearSalon = [
  check("titulo", "El titulo es requerido").trim().notEmpty(),
  check("direccion", "La direccion es requerida").trim().notEmpty(),
  check("importe", "El importe es requerido").isFloat({ min: 1 }).notEmpty(),
  check("capacidad", "La capacidad es requerida").isInt({ min: 1 }).notEmpty(),

  manejarErroresValidacion,
];

export const validarCrearServicio = [
  check("descripcion", "La descripcion es requerida").trim().notEmpty(),
  check("importe", "El importe es requerido").isFloat({ min: 1 }).notEmpty(),
  manejarErroresValidacion,
];
