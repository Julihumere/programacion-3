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
  check("nombre", "El nombre es requerido").trim().notEmpty(),
  check("apellido", "El apellido es requerido").trim().notEmpty(),
  check("nombre_usuario", "El nombre de usuario es requerido")
    .trim()
    .notEmpty(),
  check("contrasenia", "La contraseña es requerida").trim().notEmpty(),
  check("tipo_usuario", "El tipo de usuario es requerido").trim().notEmpty(),
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

export const validarCrearTurno = [
  check("orden", "El orden es requerido").isInt({ min: 1 }).notEmpty(),
  check("hora_desde", "La hora de inicio es requerida").notEmpty(),
  check("hora_hasta", "La hora de fin es requerida").notEmpty(),
  manejarErroresValidacion,
];

export const validarCrearReserva = [
  check("fecha_reserva", "La fecha de reserva es requerida").isDate().notEmpty(),
  check("salon_id", "El ID del salón es requerido").isInt({ min: 1 }).notEmpty(),
  check("turno_id", "El ID del turno es requerido").isInt({ min: 1 }).notEmpty(),
  check("usuario_id", "El ID del usuario es requerido").optional().isInt({ min: 1 }),
  check("servicios", "Los servicios deben ser un array").optional().isArray(),
  manejarErroresValidacion,
];
