import app from "./reservas.js";

process.loadEnvFile();

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`);
});
