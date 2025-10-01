import express from "express";
import dotenv from "dotenv";
import usuariosRouter from "./routes/usuarios.routes.js";
import salonesRouter from "./routes/salones.routes.js";
import morgan from "morgan";
import expressHandlebars from "express-handlebars";
import path from "path";
import passport from "./config/passport.js";

dotenv.config();

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

app.use("/usuarios", usuariosRouter);
app.use("/salones", salonesRouter);

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
