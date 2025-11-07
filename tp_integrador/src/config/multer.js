import multer from "multer";
import fs from "fs";

const dirFotosPerfil = "./public/fotos_perfil";
const dirFotosCumpleaniero = "./public/fotos_cumpleaniero";

if (!fs.existsSync(dirFotosPerfil)) {
  fs.mkdirSync(dirFotosPerfil, { recursive: true });
}

if (!fs.existsSync(dirFotosCumpleaniero)) {
  fs.mkdirSync(dirFotosCumpleaniero, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, dirFotosPerfil);
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const storageFotosCumpleaniero = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, dirFotosCumpleaniero);
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export { storage, storageFotosCumpleaniero };
