import {
  crearUsuario,
  listarUsuarios,
  iniciarSesion,
} from "../services/usuarios.service.js";

const validarUsuarioBody = (body) => {
  const {
    nombre,
    apellido,
    nombre_usuario,
    contrasenia,
    tipo_usuario,
    celular,
  } = body || {};

  if (
    !nombre ||
    !apellido ||
    !nombre_usuario ||
    !contrasenia ||
    !tipo_usuario ||
    !celular
  ) {
    return {
      ok: false,
      message:
        "Campos requeridos: nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, celular",
    };
  }
  return { ok: true };
};

const crearUsuarioController = async (req, res) => {
  try {
    const validacion = validarUsuarioBody(req.body);
    if (!validacion.ok) {
      return res
        .status(400)
        .json({ status: "error", message: validacion.message });
    }

    await crearUsuario(req.body);
    return res
      .status(201)
      .json({ status: "success", message: "Usuario creado correctamente" });
  } catch (error) {
    console.error("Error INSERT en /usuarios:", error);
    return res.status(500).json({
      status: "error",
      message: "No se pudo crear el usuario",
      error: error?.sqlMessage || error?.message,
    });
  }
};

const listarUsuariosController = async (req, res) => {
  const { tipo_usuario } = req.usuario;

  if (tipo_usuario !== 1) {
    return res.status(401).json({
      status: "error",
      message: "No tienes permisos para ver la lista de usuarios",
    });
  }

  try {
    const usuarios = await listarUsuarios();
    return res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error SELECT en /usuarios:", error);
    return res.status(500).json({
      status: "error",
      message: "No se pudo obtener la lista de usuarios",
      error: error?.code || error?.message,
    });
  }
};

const iniciarSesionController = async (req, res) => {
  try {
    const { nombre_usuario, contrasenia } = req.body;
    const usuario = await iniciarSesion(nombre_usuario, contrasenia);
    if (!usuario) {
      return res.status(401).json({
        status: "error",
        message: "Usuario o contraseña incorrectos",
      });
    }
    return res.status(200).json(usuario);
  } catch (error) {
    console.error("Error SELECT en /usuarios:", error);
  }
};
export {
  crearUsuarioController,
  listarUsuariosController,
  iniciarSesionController,
};
