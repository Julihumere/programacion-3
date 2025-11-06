import UsuariosService from "../services/usuarios.service.js";
import {
  mensajeError500,
  mensajeError404,
  mensajeError400,
} from "../utils/mensajes.js";

export default class UsuariosController {
  constructor() {
    this.usuariosService = new UsuariosService();
  }

  listarUsuarios = async (req, res) => {
    try {
      const usuarios = await this.usuariosService.listarUsuarios();
      if (!usuarios) {
        return res
          .status(404)
          .json(mensajeError404("No se encontraron usuarios"));
      }
      return res.status(200).json({
        estado: "success",
        usuarios,
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };

  obtenerUsuario = async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await this.usuariosService.obtenerUsuario(id);
      if (!usuario) {
        return res
          .status(404)
          .json(mensajeError404("No se encontró el usuario"));
      }
      return res.status(200).json({
        estado: "success",
        usuario,
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };

  actualizarUsuario = async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await this.usuariosService.actualizarUsuario(
        id,
        req.body
      );
      if (!usuario) {
        return res
          .status(400)
          .json(mensajeError400("No se pudo actualizar el usuario"));
      }
      return res.status(200).json({
        estado: "success",
        mensaje: "Usuario actualizado correctamente",
        usuario,
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };

  eliminarUsuario = async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await this.usuariosService.eliminarUsuario(id);
      if (!usuario) {
        return res
          .status(400)
          .json(mensajeError400("No se pudo eliminar el usuario"));
      }
      return res.status(200).json({
        estado: "success",
        mensaje: "Usuario eliminado correctamente",
        usuario,
      });
    } catch (error) {
      return res.status(500).json(mensajeError500(error));
    }
  };
}
