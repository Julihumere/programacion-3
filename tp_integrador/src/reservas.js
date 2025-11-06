import express from "express";
import usuariosRouter from "./routes/v1/usuarios.routes.js";
import { router as v1SalonesRouter } from "./routes/v1/salones.routes.js";
import { router as v1ServiciosRouter } from "./routes/v1/servicios.routes.js";
import turnosRouter from "./routes/v1/turnos.routes.js";
import { router as v1ReservasRouter } from "./routes/v1/reservas.routes.js";
import morgan from "morgan";
import expressHandlebars from "express-handlebars";
import path from "path";
import passport from "./config/passport.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import fs from "fs";

const hbs = expressHandlebars.create({
  defaultLayout: "main",
});

const app = express();

app.use(express.json());

// Configuración de morgan
let accessLogFile = fs.createWriteStream("./access.log", {
  flags: "a",
});
app.use(morgan("combined", { stream: accessLogFile })); // archivo .log
app.use(morgan("combined")); // consola

// Inicializar passport
app.use(passport.initialize());

// Configuración de Handlebars
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(path.dirname(""), "views"));

// Configuracion elementos estaticos
app.use(express.static(path.join(path.dirname(""), "..", "public")));

app.get("/health", (_req, res) => {
  res.send({ ok: true });
});

// Documentación Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas v1
app.use("/api/v1/usuarios", usuariosRouter);
app.use("/api/v1/salones", v1SalonesRouter);
app.use("/api/v1/servicios", v1ServiciosRouter);
app.use("/api/v1/turnos", turnosRouter);
app.use("/api/v1/reservas", v1ReservasRouter);

export default app;
