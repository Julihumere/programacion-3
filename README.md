# Programación III — Trabajos Prácticos

Repositorio para los trabajos prácticos de la materia Programación III.

## Integrantes

- Humere Julio Cesar
- Lautaro Oyuela Bidal

## Estructura del repositorio

- `tp1/`: Trabajo Práctico 1 (JavaScript — Arrays)
  - `gestorDeLibros.js`
- `tp2/`: Trabajo Práctico 2 (API Fetch)
  - `apiFetch.js`
- `tp_integrador/`: Trabajo Práctico Integrador - Aplicación Web "Trampolín Park"

## Requisitos

- Node.js (se recomienda versión 18 o superior) para ejecutar los scripts de JavaScript desde la terminal.

---

## Cómo ejecutar los trabajos prácticos individuales

### Cómo ejecutar el TP1

1. Abrí una terminal en la raíz del repositorio.
2. Ejecutá el siguiente comando:

```bash
cd tp1
node gestorDeLibros.js
```

### Cómo ejecutar el TP2

1. Abrí una terminal en la raíz del repositorio.
2. Ejecutá el siguiente comando:

```bash
cd tp2
node apiFetch.js
```

---

## Trabajo Práctico Integrador - Trampolín Park

### 📋 Descripción

**Trampolín Park** es una aplicación web para la gestión de la casa de cumpleaños "Trampolín Park". La aplicación permite administrar usuarios y salones de fiestas, con un sistema completo de autenticación y notificaciones por correo electrónico.

### ⚡ Características principales

- **Gestión de usuarios** con autenticación JWT
- **Sistema de roles** (administrador/usuario común)
- **CRUD de salones de fiestas** con validaciones
- **Notificaciones por email** cuando se crea un nuevo salón
- **Interfaz web** con Handlebars
- **Base de datos MySQL**
- **Middleware de validación** de sesiones

### 🛠️ Tecnologías utilizadas

- **Backend**: Node.js + Express.js
- **Base de datos**: MySQL
- **Autenticación**: JWT (JSON Web Tokens)
- **Encriptación**: bcrypt
- **Motor de plantillas**: Handlebars
- **Envío de emails**: Nodemailer
- **Variables de entorno**: dotenv

### 📁 Estructura del proyecto

```text
tp_integrador/
├── src/
│   ├── config/
│   │   └── db.js                    # Configuración de base de datos
│   ├── controllers/
│   │   ├── salones.controller.js    # Controladores de salones
│   │   └── usuarios.controller.js   # Controladores de usuarios
│   ├── middlewares/
│   │   └── validarSesion.js         # Middleware de validación JWT
│   ├── routes/
│   │   ├── salones.routes.js        # Rutas de salones
│   │   └── usuarios.routes.js       # Rutas de usuarios
│   ├── services/
│   │   ├── salones.service.js       # Lógica de negocio de salones
│   │   └── usuarios.service.js      # Lógica de negocio de usuarios
│   ├── utils/
│   │   ├── envioNotificacion.js     # Utilidad para envío de emails
│   │   ├── esAdmin.js               # Middleware para verificar admin
│   │   └── validador.js             # Funciones de validación
│   ├── views/
│   │   ├── layouts/
│   │   │   └── main.handlebars      # Layout principal
│   │   ├── home.hbs                 # Vista de inicio
│   │   ├── login.hbs                # Vista de login
│   │   └── plantillaSalon.hbs       # Plantilla de email
│   └── server.js                    # Archivo principal del servidor
├── public/
│   └── style.css                    # Estilos CSS
└── package.json                     # Dependencias y scripts
```

### 🚀 Instalación y configuración

1. **Clonar el repositorio** (si aún no lo tienes)
2. **Navegar al directorio del proyecto**:

   ```bash
   cd tp_integrador
   ```

3. **Instalar dependencias**:

   ```bash
   npm install
   ```

4. **Configurar variables de entorno**:
   Crear un archivo `.env` en la raíz del proyecto con:

   ```env
   # Base de datos
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_password
   DB_NAME=nombre_base_datos
   DB_PORT=3306

   # JWT
   JWT_SECRET=tu_clave_secreta_jwt

   # Email
   EMAIL_USER=tu_email@gmail.com
   EMAIL_PASSWORD=tu_password_app
   EMAIL_DESTINATARIO=destinatario@example.com

   # Servidor
   PORT=3000
   ```

5. **Configurar la base de datos**:
   - Crear una base de datos MySQL
   - Crear las tablas necesarias para usuarios y salones

### 🎯 Uso de la aplicación

#### Modo desarrollo

```bash
npm run dev
```

#### Modo producción

```bash
npm start
```

La aplicación estará disponible en: `http://localhost:3000`

### 📊 API Endpoints

#### Usuarios (`/usuarios`)

- `POST /usuarios/registrar` - Crear nuevo usuario
- `POST /usuarios/iniciar_sesion` - Iniciar sesión
- `GET /usuarios/ver_usuarios` - Listar usuarios (solo admin)

#### Salones (`/salones`)

- `POST /salones` - Crear salón (solo admin)
- `GET /salones` - Listar salones (autenticado)
- `GET /salones/:id` - Obtener salón por ID (autenticado)

#### Health Check

- `GET /health` - Verificar estado del servidor

### 🔒 Sistema de autenticación

La aplicación utiliza JWT para la autenticación:

1. El usuario se registra o inicia sesión
2. Se genera un token JWT
3. El token debe incluirse en el header `Authorization: Bearer <token>` para acceder a rutas protegidas
4. Los administradores (tipo_usuario = 1) tienen permisos adicionales

### 📧 Notificaciones por email

Cuando se crea un nuevo salón, se envía automáticamente una notificación por email al destinatario configurado usando una plantilla HTML personalizada.

---
