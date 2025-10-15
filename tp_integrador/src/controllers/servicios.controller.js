import {
  crearServicio,
  listarServicios,
  obtenerServicio,
  actualizarServicio,
  eliminarServicio,
} from "../services/servicios.service.js";
import { validarServicioBody } from "../utils/validador.js";

const crearServicioController = async (req, res) => {
  try {
    const validacion = validarServicioBody(req.body);
    if (!validacion.ok) {
      return res
        .status(400)
        .json({ status: "error", message: validacion.message });
    }

    const servicio = await crearServicio(req.body);
    if (!servicio) {
      throw new Error("No se pudo crear el servicio");
    }

    return res
      .status(201)
      .json({ status: "success", message: "Servicio creado correctamente" });
  } catch (error) {
    console.error("Error INSERT en /servicios:", error);
    return res.status(500).json({
      status: "error",
      message: "No se pudo crear el servicio",
      error: error?.sqlMessage || error?.message,
    });
  }
};

const listarServiciosController = async (req, res) => {
  try {
    const servicios = await listarServicios();
    return res.status(200).json(servicios);
  } catch (error) {
    console.error("Error SELECT en /servicios:", error);
    return res.status(500).json({
      status: "error",
      message: "No se pudo obtener la lista de servicios",
      error: error?.code || error?.message,
    });
  }
};

const obtenerServicioController = async (req, res) => {
  try {
    const servicio = await obtenerServicio(req.params.id);
    if (!servicio) {
      return res.status(404).json({
        status: "error",
        message: "Servicio no encontrado",
      });
    }
    return res.status(200).json(servicio);
  } catch (error) {
    console.error("Error SELECT en /servicios:", error);
    return res.status(500).json({
      status: "error",
      message: "No se pudo obtener el servicio",
      error: error?.code || error?.message,
    });
  }
};

const actualizarServicioController = async (req, res) => {
  try {
    const validacion = validarServicioBody(req.body);
    if (!validacion.ok) {
      return res
        .status(400)
        .json({ status: "error", message: validacion.message });
    }

    const servicio = await actualizarServicio(req.params.id, req.body);
    if (!servicio) {
      throw new Error("No se pudo actualizar el servicio");
    }

    return res
      .status(200)
      .json({ status: "success", message: "Servicio actualizado correctamente" });
  } catch (error) {
    console.error("Error UPDATE en /servicios:", error);
    return res.status(500).json({
      status: "error",
      message: "No se pudo actualizar el servicio",
      error: error?.sqlMessage || error?.message,
    });
  }
};

const eliminarServicioController = async (req, res) => {
  try {
    const servicio = await eliminarServicio(req.params.id);
    if (!servicio) {
      throw new Error("No se pudo eliminar el servicio");
    }

    return res
      .status(200)
      .json({ status: "success", message: "Servicio eliminado correctamente" });
  } catch (error) {
    console.error("Error DELETE en /servicios:", error);
    return res.status(500).json({
      status: "error",
      message: "No se pudo eliminar el servicio",
      error: error?.sqlMessage || error?.message,
    });
  }
};

export {
  crearServicioController,
  listarServiciosController,
  obtenerServicioController,
  actualizarServicioController,
  eliminarServicioController,
};
