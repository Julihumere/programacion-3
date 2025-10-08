import {
  crearSalon,
  listarSalones,
  obtenerSalon,
  actualizarSalon,
  eliminarSalon,
} from "../services/salones.service.js";
import { validarSalonBody } from "../utils/validador.js";
import { enviarNotificacion } from "../utils/envioNotificacion.js";

const crearSalonController = async (req, res) => {
  try {
    const validacion = validarSalonBody(req.body);
    if (!validacion.ok) {
      return res
        .status(400)
        .json({ status: "error", message: validacion.message });
    }

    const salon = await crearSalon(req.body);
    if (!salon) {
      throw new Error("No se pudo crear el salon");
    }

    await enviarNotificacion({
      titulo: `Nuevo Salón de Fiestas: ${req.body.titulo}`,
      direccion: req.body.direccion,
      latitud: req.body.latitud,
      longitud: req.body.longitud,
      capacidad: req.body.capacidad,
      importe: req.body.importe,
      destinatario: process.env.EMAIL_DESTINATARIO,
    });

    return res
      .status(201)
      .json({ status: "success", message: "Salon creado correctamente" });
  } catch (error) {
    console.error("Error INSERT en /salones:", error);
    return res.status(500).json({
      status: "error",
      message: "No se pudo crear el salon",
      error: error?.sqlMessage || error?.message,
    });
  }
};

const listarSalonesController = async (req, res) => {
  try {
    const salones = await listarSalones();
    return res.status(200).json(salones);
  } catch (error) {
    console.error("Error SELECT en /salones:", error);
    return res.status(500).json({
      status: "error",
      message: "No se pudo obtener la lista de salones",
      error: error?.code || error?.message,
    });
  }
};

const obtenerSalonController = async (req, res) => {
  try {
    const salon = await obtenerSalon(req.params.id);
    if (!salon) {
      return res.status(404).json({
        status: "error",
        message: "Salon no encontrado",
      });
    }
    return res.status(200).json(salon);
  } catch (error) {
    console.error("Error SELECT en /salones:", error);
    return res.status(500).json({
      status: "error",
      message: "No se pudo obtener el salon",
      error: error?.code || error?.message,
    });
  }
};

const actualizarSalonController = async (req, res) => {
  try {
    const validacion = validarSalonBody(req.body);
    if (!validacion.ok) {
      return res
        .status(400)
        .json({ status: "error", message: validacion.message });
    }

    const salon = await actualizarSalon(req.params.id, req.body);
    if (!salon) {
      throw new Error("No se pudo actualizar el salon");
    }

    return res
      .status(200)
      .json({ status: "success", message: "Salon actualizado correctamente" });
  } catch (error) {
    console.error("Error UPDATE en /salones:", error);
    return res.status(500).json({
      status: "error",
      message: "No se pudo actualizar el salon",
      error: error?.sqlMessage || error?.message,
    });
  }
};

const eliminarSalonController = async (req, res) => {
  try {
    const salon = await eliminarSalon(req.params.id);
    if (!salon) {
      throw new Error("No se pudo eliminar el salon");
    }

    return res
      .status(200)
      .json({ status: "success", message: "Salon eliminado correctamente" });
  } catch (error) {
    console.error("Error DELETE en /salones:", error);
    return res.status(500).json({
      status: "error",
      message: "No se pudo eliminar el salon",
      error: error?.sqlMessage || error?.message,
    });
  }
};

export {
  crearSalonController,
  listarSalonesController,
  obtenerSalonController,
  actualizarSalonController,
  eliminarSalonController,
};
