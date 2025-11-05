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
        Usuario: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID único del usuario",
            },
            nombre: {
              type: "string",
              description: "Nombre del usuario",
            },
            email: {
              type: "string",
              format: "email",
              description: "Email del usuario",
            },
            telefono: {
              type: "string",
              description: "Teléfono del usuario",
            },
            esAdmin: {
              type: "boolean",
              description: "Indica si el usuario es administrador",
            },
          },
        },
        UsuarioRegistro: {
          type: "object",
          required: ["nombre", "email", "password", "telefono"],
          properties: {
            nombre: {
              type: "string",
              description: "Nombre del usuario",
            },
            email: {
              type: "string",
              format: "email",
              description: "Email del usuario",
            },
            password: {
              type: "string",
              format: "password",
              description: "Contraseña del usuario",
            },
            telefono: {
              type: "string",
              description: "Teléfono del usuario",
            },
          },
        },
        Login: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              description: "Email del usuario",
            },
            password: {
              type: "string",
              format: "password",
              description: "Contraseña del usuario",
            },
          },
        },
        Salon: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID único del salón",
            },
            nombre: {
              type: "string",
              description: "Nombre del salón",
            },
            capacidad: {
              type: "integer",
              description: "Capacidad máxima del salón",
            },
            precio: {
              type: "number",
              format: "float",
              description: "Precio del salón",
            },
            descripcion: {
              type: "string",
              description: "Descripción del salón",
            },
          },
        },
        CrearSalon: {
          type: "object",
          required: ["nombre", "capacidad", "precio"],
          properties: {
            nombre: {
              type: "string",
              description: "Nombre del salón",
            },
            capacidad: {
              type: "integer",
              description: "Capacidad máxima del salón",
            },
            precio: {
              type: "number",
              format: "float",
              description: "Precio del salón",
            },
            descripcion: {
              type: "string",
              description: "Descripción del salón",
            },
          },
        },
        Servicio: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID único del servicio",
            },
            nombre: {
              type: "string",
              description: "Nombre del servicio",
            },
            descripcion: {
              type: "string",
              description: "Descripción del servicio",
            },
            precio: {
              type: "number",
              format: "float",
              description: "Precio del servicio",
            },
          },
        },
        CrearServicio: {
          type: "object",
          required: ["nombre", "precio"],
          properties: {
            nombre: {
              type: "string",
              description: "Nombre del servicio",
            },
            descripcion: {
              type: "string",
              description: "Descripción del servicio",
            },
            precio: {
              type: "number",
              format: "float",
              description: "Precio del servicio",
            },
          },
        },
        Turno: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "ID único del turno",
            },
            fecha: {
              type: "string",
              format: "date",
              description: "Fecha del turno",
            },
            horaInicio: {
              type: "string",
              format: "time",
              description: "Hora de inicio del turno",
            },
            horaFin: {
              type: "string",
              format: "time",
              description: "Hora de fin del turno",
            },
            disponible: {
              type: "boolean",
              description: "Indica si el turno está disponible",
            },
            salonId: {
              type: "integer",
              description: "ID del salón asociado",
            },
          },
        },
        CrearTurno: {
          type: "object",
          required: ["fecha", "horaInicio", "horaFin", "salonId"],
          properties: {
            fecha: {
              type: "string",
              format: "date",
              description: "Fecha del turno",
            },
            horaInicio: {
              type: "string",
              format: "time",
              description: "Hora de inicio del turno",
            },
            horaFin: {
              type: "string",
              format: "time",
              description: "Hora de fin del turno",
            },
            salonId: {
              type: "integer",
              description: "ID del salón asociado",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Mensaje de error",
            },
          },
        },
        Success: {
          type: "object",
          properties: {
            mensaje: {
              type: "string",
              description: "Mensaje de éxito",
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
  apis: ["./src/v1/routes/*.js"], // Path a los archivos que contienen las anotaciones
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

