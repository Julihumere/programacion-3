export default class NotificacionesService {
  enviarCorreo = async (notificacion, idPlantilla) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const plantilla = emails.find(
      (email) => email.id === idPlantilla
    )?.plantilla;
    if (!plantilla) {
      throw new Error("Plantilla de email no encontrada");
    }
    const datosPlantilla = await readFile(
      path.join(__dirname, "..", "views", plantilla),
      "utf8"
    );
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
}
