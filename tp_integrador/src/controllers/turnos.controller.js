import {
  crearTurno,
  listarTurnos,
  obtenerTurno,
  actualizarTurno,
  eliminarTurno,
} from "../services/turnos.service.js";
import { validarTurnoBody } from "../utils/validador.js";

const crearTurnoController = async (req, res) => {
  try {
    const validacion = validarTurnoBody(req.body);
    if (!validacion.ok) {
      return res
        .status(400)
        .json({ status: "error", message: validacion.message });
    }

    const turno = await crearTurno(req.body);
    if (!turno) {
      throw new Error("No se pudo crear el turno");
    }

    return res
      .status(201)
      .json({ status: "success", message: "Turno creado correctamente" });
  } catch (error) {
    console.error("Error INSERT en /turnos:", error);
    return res.status(500).json({
      status: "error",
      message: "No se pudo crear el turno",
      error: error?.sqlMessage || error?.message,
    });
  }
};

const listarTurnosController = async (req, res) => {
  try {
    const turnos = await listarTurnos();
    return res.status(200).json(turnos);
  } catch (error) {
    console.error("Error SELECT en /turnos:", error);
    return res.status(500).json({
      status: "error",
      message: "No se pudo obtener la lista de turnos",
      error: error?.code || error?.message,
    });
  }
};

const obtenerTurnoController = async (req, res) => {
  try {
    const turno = await obtenerTurno(req.params.id);
    if (!turno) {
      return res.status(404).json({
        status: "error",
        message: "Turno no encontrado",
      });
    }
    return res.status(200).json(turno);
  } catch (error) {
    console.error("Error SELECT en /turnos:", error);
    return res.status(500).json({
      status: "error",
      message: "No se pudo obtener el turno",
      error: error?.code || error?.message,
    });
  }
};

const actualizarTurnoController = async (req, res) => {
  try {
    const validacion = validarTurnoBody(req.body);
    if (!validacion.ok) {
      return res
        .status(400)
        .json({ status: "error", message: validacion.message });
    }

    const turno = await actualizarTurno(req.params.id, req.body);
    if (!turno) {
      throw new Error("No se pudo actualizar el turno");
    }

    return res
      .status(200)
      .json({ status: "success", message: "Turno actualizado correctamente" });
  } catch (error) {
    console.error("Error UPDATE en /turnos:", error);
    return res.status(500).json({
      status: "error",
      message: "No se pudo actualizar el turno",
      error: error?.sqlMessage || error?.message,
    });
  }
};

const eliminarTurnoController = async (req, res) => {
  try {
    const turno = await eliminarTurno(req.params.id);
    if (!turno) {
      throw new Error("No se pudo eliminar el turno");
    }

    return res
      .status(200)
      .json({ status: "success", message: "Turno eliminado correctamente" });
  } catch (error) {
    console.error("Error DELETE en /turnos:", error);
    return res.status(500).json({
      status: "error",
      message: "No se pudo eliminar el turno",
      error: error?.sqlMessage || error?.message,
    });
  }
};

export {
  crearTurnoController,
  listarTurnosController,
  obtenerTurnoController,
  actualizarTurnoController,
  eliminarTurnoController,
};
