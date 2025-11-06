import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Trampolín Park API",
      version: "1.0.0",
      description:
        "API para la gestión de la casa de cumpleaños Trampolín Park. Esta API permite gestionar usuarios, salones, servicios y turnos para reservas.",
      contact: {
        name: "Julio Cesar Humere, Lautaro Oyuela",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Servidor de desarrollo",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Autenticación JWT. Obtén el token en /usuarios/iniciar_sesion",
        },
      },
      schemas: {
//========== USUARIOS ==========
        Usuario: {
          type: "object",
          properties: {
            usuario_id: {
              type: "integer",
              description: "ID único del usuario",
              example: 1,
            },
            nombre: {
              type: "string",
              description: "Nombre del usuario",
              example: "Juan",
            },
            apellido: {
              type: "string",
              description: "Apellido del usuario",
              example: "Pérez",
            },
            nombre_usuario: {
              type: "string",
              description: "Nombre de usuario / Email",
              example: "juan@email.com",
            },
            tipo_usuario: {
              type: "integer",
              description: "Tipo de usuario: 1=Cliente, 2=Empleado, 3=Administrador",
              example: 1,
              enum: [1, 2, 3],
            },
            celular: {
              type: "string",
              description: "Número de celular",
              example: "3434123456",
            },
            foto: {
              type: "string",
              nullable: true,
              description: "URL de la foto de perfil",
              example: null,
            },
            activo: {
              type: "integer",
              description: "Estado del usuario: 0=Inactivo, 1=Activo",
              example: 1,
            },
            creado: {
              type: "string",
              format: "date-time",
              description: "Fecha de creación",
            },
            modificado: {
              type: "string",
              format: "date-time",
              description: "Fecha de última modificación",
            },
          },
        },
        UsuarioRegistro: {
          type: "object",
          required: ["nombre", "apellido", "nombre_usuario", "contrasenia", "tipo_usuario"],
          properties: {
            nombre: {
              type: "string",
              description: "Nombre del usuario",
              example: "Juan",
            },
            apellido: {
              type: "string",
              description: "Apellido del usuario",
              example: "Pérez",
            },
            nombre_usuario: {
              type: "string",
              description: "Nombre de usuario / Email",
              example: "juan@email.com",
            },
            contrasenia: {
              type: "string",
              format: "password",
              description: "Contraseña del usuario",
              example: "password123",
            },
            tipo_usuario: {
              type: "integer",
              description: "Tipo de usuario: 1=Cliente, 2=Empleado, 3=Administrador",
              example: 1,
              enum: [1, 2, 3],
            },
            celular: {
              type: "string",
              description: "Número de celular (opcional)",
              example: "3434123456",
            },
            foto: {
              type: "string",
              description: "URL de la foto de perfil (opcional)",
              example: null,
            },
          },
        },
        Login: {
          type: "object",
          required: ["nombre_usuario", "contrasenia"],
          properties: {
            nombre_usuario: {
              type: "string",
              description: "Nombre de usuario / Email",
              example: "juan@email.com",
            },
            contrasenia: {
              type: "string",
              format: "password",
              description: "Contraseña del usuario",
              example: "password123",
            },
          },
        },
        
// ========== SALONES ==========
        Salon: {
          type: "object",
          properties: {
            salon_id: {
              type: "integer",
              description: "ID único del salón",
              example: 1,
            },
            titulo: {
              type: "string",
              description: "Título del salón",
              example: "Salón Principal",
            },
            direccion: {
              type: "string",
              description: "Dirección del salón",
              example: "Av. San Martín 1234",
            },
            latitud: {
              type: "number",
              format: "double",
              nullable: true,
              description: "Latitud geográfica",
              example: -31.7333,
            },
            longitud: {
              type: "number",
              format: "double",
              nullable: true,
              description: "Longitud geográfica",
              example: -60.5167,
            },
            capacidad: {
              type: "integer",
              description: "Capacidad máxima de personas",
              example: 100,
            },
            importe: {
              type: "number",
              format: "double",
              description: "Precio del salón",
              example: 25000.00,
            },
            activo: {
              type: "integer",
              description: "Estado del salón: 0=Inactivo, 1=Activo",
              example: 1,
            },
            creado: {
              type: "string",
              format: "date-time",
              description: "Fecha de creación",
            },
            modificado: {
              type: "string",
              format: "date-time",
              description: "Fecha de última modificación",
            },
          },
        },
        CrearSalon: {
          type: "object",
          required: ["titulo", "direccion", "capacidad", "importe"],
          properties: {
            titulo: {
              type: "string",
              description: "Título del salón",
              example: "Salón Principal",
            },
            direccion: {
              type: "string",
              description: "Dirección del salón",
              example: "Av. San Martín 1234",
            },
            latitud: {
              type: "number",
              format: "double",
              description: "Latitud geográfica (opcional)",
              example: -31.7333,
            },
            longitud: {
              type: "number",
              format: "double",
              description: "Longitud geográfica (opcional)",
              example: -60.5167,
            },
            capacidad: {
              type: "integer",
              minimum: 1,
              description: "Capacidad máxima de personas",
              example: 100,
            },
            importe: {
              type: "number",
              format: "double",
              minimum: 1,
              description: "Precio del salón",
              example: 25000.00,
            },
            activo: {
              type: "integer",
              description: "Estado del salón: 0=Inactivo, 1=Activo (opcional, por defecto 1)",
              example: 1,
              default: 1,
            },
          },
        },
        
// ========== SERVICIOS ==========
        Servicio: {
          type: "object",
          properties: {
            servicio_id: {
              type: "integer",
              description: "ID único del servicio",
              example: 1,
            },
            descripcion: {
              type: "string",
              description: "Descripción del servicio",
              example: "Decoración Temática",
            },
            importe: {
              type: "number",
              format: "double",
              description: "Precio del servicio",
              example: 5000.00,
            },
            activo: {
              type: "integer",
              description: "Estado del servicio: 0=Inactivo, 1=Activo",
              example: 1,
            },
            creado: {
              type: "string",
              format: "date-time",
              description: "Fecha de creación",
            },
            modificado: {
              type: "string",
              format: "date-time",
              description: "Fecha de última modificación",
            },
          },
        },
        CrearServicio: {
          type: "object",
          required: ["descripcion", "importe"],
          properties: {
            descripcion: {
              type: "string",
              description: "Descripción del servicio",
              example: "Decoración Temática",
            },
            importe: {
              type: "number",
              format: "double",
              minimum: 1,
              description: "Precio del servicio",
              example: 5000.00,
            },
            activo: {
              type: "integer",
              description: "Estado del servicio: 0=Inactivo, 1=Activo (opcional, por defecto 1)",
              example: 1,
              default: 1,
            },
          },
        },
        
        
  // ========== TURNOS ==========
        Turno: {
          type: "object",
          properties: {
            turno_id: {
              type: "integer",
              description: "ID único del turno",
              example: 1,
            },
            orden: {
              type: "integer",
              description: "Orden de prioridad del turno",
              example: 1,
            },
            hora_desde: {
              type: "string",
              format: "time",
              description: "Hora de inicio del turno (HH:MM:SS)",
              example: "12:00:00",
            },
            hora_hasta: {
              type: "string",
              format: "time",
              description: "Hora de fin del turno (HH:MM:SS)",
              example: "14:00:00",
            },
            activo: {
              type: "integer",
              description: "Estado del turno: 0=Inactivo, 1=Activo",
              example: 1,
            },
            creado: {
              type: "string",
              format: "date-time",
              description: "Fecha de creación",
            },
            modificado: {
              type: "string",
              format: "date-time",
              description: "Fecha de última modificación",
            },
          },
        },
        CrearTurno: {
          type: "object",
          required: ["orden", "hora_desde", "hora_hasta"],
          properties: {
            orden: {
              type: "integer",
              minimum: 1,
              description: "Orden de prioridad del turno",
              example: 1,
            },
            hora_desde: {
              type: "string",
              format: "time",
              description: "Hora de inicio del turno (HH:MM:SS)",
              example: "12:00:00",
            },
            hora_hasta: {
              type: "string",
              format: "time",
              description: "Hora de fin del turno (HH:MM:SS)",
              example: "14:00:00",
            },
            activo: {
              type: "integer",
              description: "Estado del turno: 0=Inactivo, 1=Activo (opcional, por defecto 1)",
              example: 1,
              default: 1,
            },
          },
        },
        
// ========== RESERVAS ==========
        Reserva: {
          type: "object",
          properties: {
            reserva_id: {
              type: "integer",
              description: "ID único de la reserva",
              example: 1,
            },
            fecha_reserva: {
              type: "string",
              format: "date",
              description: "Fecha de la reserva",
              example: "2025-12-15",
            },
            salon_id: {
              type: "integer",
              description: "ID del salón reservado",
              example: 1,
            },
            usuario_id: {
              type: "integer",
              description: "ID del usuario que realizó la reserva",
              example: 5,
            },
            turno_id: {
              type: "integer",
              description: "ID del turno reservado",
              example: 2,
            },
            foto_cumpleaniero: {
              type: "string",
              nullable: true,
              description: "URL de la foto del cumpleañero",
              example: null,
            },
            tematica: {
              type: "string",
              nullable: true,
              description: "Temática de la fiesta",
              example: "Superhéroes",
            },
            importe_salon: {
              type: "number",
              format: "double",
              description: "Importe del salón al momento de la reserva",
              example: 25000.00,
            },
            importe_total: {
              type: "number",
              format: "double",
              description: "Importe total (salón + servicios)",
              example: 32000.00,
            },
            activo: {
              type: "integer",
              description: "Estado de la reserva: 0=Cancelada, 1=Activa",
              example: 1,
            },
            creado: {
              type: "string",
              format: "date-time",
              description: "Fecha de creación",
            },
            modificado: {
              type: "string",
              format: "date-time",
              description: "Fecha de última modificación",
            },
            servicios: {
              type: "array",
              description: "Lista de servicios adicionales de la reserva",
              items: {
                type: "object",
                properties: {
                  reserva_servicio_id: {
                    type: "integer",
                    example: 1,
                  },
                  servicio_id: {
                    type: "integer",
                    example: 2,
                  },
                  importe: {
                    type: "number",
                    format: "double",
                    example: 5000.00,
                  },
                  servicio_descripcion: {
                    type: "string",
                    example: "Decoración Temática",
                  },
                },
              },
            },
          },
        },
        CrearReserva: {
          type: "object",
          required: ["fecha_reserva", "salon_id", "turno_id"],
          properties: {
            fecha_reserva: {
              type: "string",
              format: "date",
              description: "Fecha de la reserva (YYYY-MM-DD)",
              example: "2025-12-25",
            },
            salon_id: {
              type: "integer",
              minimum: 1,
              description: "ID del salón a reservar",
              example: 1,
            },
            turno_id: {
              type: "integer",
              minimum: 1,
              description: "ID del turno a reservar",
              example: 2,
            },
            usuario_id: {
              type: "integer",
              minimum: 1,
              description: "ID del usuario (opcional para clientes, se asigna automáticamente)",
              example: 5,
            },
            tematica: {
              type: "string",
              description: "Temática de la fiesta (opcional)",
              example: "Superhéroes",
            },
            foto_cumpleaniero: {
              type: "string",
              description: "URL de la foto del cumpleañero (opcional)",
              example: "https://example.com/foto.jpg",
            },
            servicios: {
              type: "array",
              description: "Array de IDs de servicios adicionales (opcional)",
              items: {
                type: "integer",
              },
              example: [2, 3, 5],
            },
          },
        },
        AgregarServicioReserva: {
          type: "object",
          required: ["servicio_id"],
          properties: {
            servicio_id: {
              type: "integer",
              minimum: 1,
              description: "ID del servicio a agregar",
              example: 5,
            },
          },
        },
        
// ========== RESPUESTAS GENÉRICAS ==========
        Error: {
          type: "object",
          properties: {
            estado: {
              type: "string",
              example: "error",
            },
            mensaje: {
              type: "string",
              description: "Mensaje de error",
              example: "Recurso no encontrado",
            },
          },
        },
        Success: {
          type: "object",
          properties: {
            estado: {
              type: "string",
              example: "success",
            },
            mensaje: {
              type: "string",
              description: "Mensaje de éxito",
              example: "Operación realizada correctamente",
            },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            estado: {
              type: "string",
              example: "success",
            },
            mensaje: {
              type: "string",
              example: "Sesión iniciada correctamente",
            },
            token: {
              type: "string",
              description: "Token JWT para autenticación",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
            usuario: {
              $ref: "#/components/schemas/Usuario",
            },
          },
        },
      },
      responses: {
        UnauthorizedError: {
          description: "Token de acceso no válido o faltante",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        ForbiddenError: {
          description: "No tienes permisos para realizar esta acción",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        NotFoundError: {
          description: "Recurso no encontrado",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        ValidationError: {
          description: "Error de validación de datos",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/docs/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

