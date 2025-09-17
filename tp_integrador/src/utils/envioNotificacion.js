import nodemailer from "nodemailer";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";

const enviarNotificacion = async (notificacion) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const plantilla = path.join(__dirname, "..", "views", "plantillaSalon.hbs");

  const datosPlantilla = await readFile(plantilla, "utf8");

  const template = Handlebars.compile(datosPlantilla);
  const html = template(notificacion);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const configEmail = {
    from: process.env.EMAIL_USER,
    to: notificacion.destinatario,
    subject: `🏷️ ${notificacion.titulo}`,
    html,
  };

  try {
    await transporter.sendMail(configEmail);
    return { ok: true, message: "Email enviado correctamente" };
  } catch (error) {
    console.error("Error al enviar el email:", error);
    return { ok: false, message: "Error al enviar el email" };
  }
};

export { enviarNotificacion };
