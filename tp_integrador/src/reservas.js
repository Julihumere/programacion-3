import express from "express";
import usuariosRouter from "./v1/routes/usuarios.routes.js";
import { router as v1SalonesRouter } from "./v1/routes/salones.routes.js";
import { router as v1ServiciosRouter } from "./v1/routes/servicios.routes.js";
import turnosRouter from "./v1/routes/turnos.routes.js";
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

export default app;
