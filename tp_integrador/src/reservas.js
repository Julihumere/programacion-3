import express from "express";
import morgan from "morgan";
import expressHandlebars from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import passport from "./config/passport.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import fs from "fs";

import { router as v1UsuariosRouter } from "./routes/v1/usuarios.routes.js";
import { router as v1SalonesRouter } from "./routes/v1/salones.routes.js";
import { router as v1ServiciosRouter } from "./routes/v1/servicios.routes.js";
import { router as v1TurnosRouter } from "./routes/v1/turnos.routes.js";
import { router as v1ReservasRouter } from "./routes/v1/reservas.routes.js";
import { router as v1AuthRouter } from "./routes/v1/auth.routes.js";
import { router as v1InformesRouter } from "./routes/v1/informes.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.set("views", path.join(__dirname, "..", "views"));

// Configuracion elementos estaticos
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/health", (_req, res) => {
  res.send({ ok: true });
});

// Documentación Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas v1
app.use("/api/v1/usuarios", v1UsuariosRouter);
app.use("/api/v1/salones", v1SalonesRouter);
app.use("/api/v1/servicios", v1ServiciosRouter);
app.use("/api/v1/turnos", v1TurnosRouter);
app.use("/api/v1/reservas", v1ReservasRouter);
app.use("/api/v1/auth", v1AuthRouter);
app.use("/api/v1/informes", v1InformesRouter);

export default app;
