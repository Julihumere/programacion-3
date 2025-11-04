import express from "express";
import usuariosRouter from "./v1/routes/usuarios.routes.js";
import { router as v1SalonesRouter } from "./v1/routes/salones.routes.js";
import serviciosRouter from "./v1/routes/servicios.routes.js";
import turnosRouter from "./v1/routes/turnos.routes.js";
import morgan from "morgan";
import expressHandlebars from "express-handlebars";
import path from "path";
import passport from "./config/passport.js";

const hbs = expressHandlebars.create({
  defaultLayout: "main",
});

const app = express();

app.use(express.json());
app.use(morgan("dev"));

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

// Rutas v1
app.use("/api/v1/usuarios", usuariosRouter);
app.use("/api/v1/salones", v1SalonesRouter);
app.use("/api/v1/servicios", serviciosRouter);
app.use("/api/v1/turnos", turnosRouter);

export default app;
