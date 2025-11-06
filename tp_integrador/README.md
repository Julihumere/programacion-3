# Trampolín Park - API REST

Aplicación web para la gestión de la casa de cumpleaños "Trampolín Park".

## 📋 Tabla de Contenidos

- [Instalación](#instalación)
- [Configuración](#configuración)
- [Endpoints](#endpoints)
  - [Health Check](#health-check)
  - [Usuarios](#usuarios)
  - [Salones](#salones)
  - [Servicios](#servicios)
  - [Turnos](#turnos)
- [Autenticación](#autenticación)
- [Permisos](#permisos)

## 🚀 Instalación

```bash
npm install
```

## ⚙️ Configuración

1. Crear un archivo `.env` en la raíz del proyecto
2. Configurar las variables de entorno necesarias
3. Iniciar la aplicación:

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

La aplicación se ejecuta por defecto en el puerto 3000.

## 📡 Endpoints

### Health Check

#### GET /health

- **Descripción**: Verificar el estado del servidor
- **Autenticación**: No requerida
- **Respuesta**: `{ ok: true }`

### Usuarios

#### POST /usuarios/registrar

- **Descripción**: Registrar un nuevo usuario
- **Autenticación**: No requerida
- **Controlador**: `crearUsuarioController`

#### POST /usuarios/iniciar_sesion

- **Descripción**: Iniciar sesión de usuario
- **Autenticación**: No requerida
- **Controlador**: `iniciarSesionController`

#### GET /usuarios/ver_usuarios

- **Descripción**: Listar todos los usuarios
- **Autenticación**: ✅ Requerida (`validarSesion`)
- **Permisos**: 🔒 Solo administradores (`esAdmin`)
- **Controlador**: `listarUsuariosController`

### Salones

#### POST /salones

- **Descripción**: Crear un nuevo salón
- **Autenticación**: ✅ Requerida (`validarSesion`)
- **Permisos**: 🔒 Solo administradores (`esAdmin`)
- **Controlador**: `crearSalonController`

#### GET /salones

- **Descripción**: Listar todos los salones
- **Autenticación**: ✅ Requerida (`validarSesion`)
- **Controlador**: `listarSalonesController`

#### GET /salones/:id

- **Descripción**: Obtener un salón específico por ID
- **Autenticación**: ✅ Requerida (`validarSesion`)
- **Parámetros**:
  - `id` (URL): ID del salón
- **Controlador**: `obtenerSalonController`

#### PUT /salones/:id

- **Descripción**: Actualizar un salón específico
- **Autenticación**: ✅ Requerida (`validarSesion`)
- **Permisos**: 🔒 Solo administradores (`esAdmin`)
- **Parámetros**:
  - `id` (URL): ID del salón
- **Controlador**: `actualizarSalonController`

#### DELETE /salones/:id

- **Descripción**: Eliminar un salón específico
- **Autenticación**: ✅ Requerida (`validarSesion`)
- **Permisos**: 🔒 Solo administradores (`esAdmin`)
- **Parámetros**:
  - `id` (URL): ID del salón
- **Controlador**: `eliminarSalonController`

### Servicios

#### POST /servicios

- **Descripción**: Crear un nuevo servicio
- **Autenticación**: ✅ Requerida (`validarSesion`)
- **Permisos**: 🔒 Solo administradores (`esAdmin`)
- **Controlador**: `crearServicioController`

#### GET /servicios

- **Descripción**: Listar todos los servicios
- **Autenticación**: ✅ Requerida (`validarSesion`)
- **Controlador**: `listarServiciosController`

#### GET /servicios/:id

- **Descripción**: Obtener un servicio específico por ID
- **Autenticación**: ✅ Requerida (`validarSesion`)
- **Parámetros**:
  - `id` (URL): ID del servicio
- **Controlador**: `obtenerServicioController`

#### PUT /servicios/:id

- **Descripción**: Actualizar un servicio específico
- **Autenticación**: ✅ Requerida (`validarSesion`)
- **Permisos**: 🔒 Solo administradores (`esAdmin`)
- **Parámetros**:
  - `id` (URL): ID del servicio
- **Controlador**: `actualizarServicioController`

#### DELETE /servicios/:id

- **Descripción**: Eliminar un servicio específico
- **Autenticación**: ✅ Requerida (`validarSesion`)
- **Permisos**: 🔒 Solo administradores (`esAdmin`)
- **Parámetros**:
  - `id` (URL): ID del servicio
- **Controlador**: `eliminarServicioController`

### Turnos

#### POST /turnos

- **Descripción**: Crear un nuevo turno
- **Autenticación**: ✅ Requerida (`validarSesion`)
- **Permisos**: 🔒 Solo administradores (`esAdmin`)
- **Controlador**: `crearTurnoController`

#### GET /turnos

- **Descripción**: Listar todos los turnos
- **Autenticación**: ✅ Requerida (`validarSesion`)
- **Controlador**: `listarTurnosController`

#### GET /turnos/:id

- **Descripción**: Obtener un turno específico por ID
- **Autenticación**: ✅ Requerida (`validarSesion`)
- **Parámetros**:
  - `id` (URL): ID del turno
- **Controlador**: `obtenerTurnoController`

#### PUT /turnos/:id

- **Descripción**: Actualizar un turno específico
- **Autenticación**: ✅ Requerida (`validarSesion`)
- **Permisos**: 🔒 Solo administradores (`esAdmin`)
- **Parámetros**:
  - `id` (URL): ID del turno
- **Controlador**: `actualizarTurnoController`

#### DELETE /turnos/:id

- **Descripción**: Eliminar un turno específico
- **Autenticación**: ✅ Requerida (`validarSesion`)
- **Permisos**: 🔒 Solo administradores (`esAdmin`)
- **Parámetros**:
  - `id` (URL): ID del turno
- **Controlador**: `eliminarTurnoController`

## 🔐 Autenticación

La API utiliza JWT (JSON Web Tokens) para la autenticación. Los endpoints que requieren autenticación están marcados con ✅.

Para acceder a endpoints protegidos, incluye el token JWT en el header de autorización:

```
Authorization: Bearer <tu_jwt_token>
```

## 👥 Permisos

Algunos endpoints requieren permisos especiales:

- 🔒 **Solo administradores**: Endpoints que requieren el middleware `esAdmin`
- ✅ **Usuario autenticado**: Endpoints que requieren el middleware `validarSesion`

## 🛠️ Tecnologías

- **Node.js** con **Express.js**
- **MySQL** como base de datos
- **Passport.js** para autenticación
- **Handlebars** para vistas
- **bcrypt** para encriptación de contraseñas
- **Nodemailer** para envío de notificaciones

---

## 👨‍💻 Autores

- Julio Cesar Humere
- Lautaro Oyuela
