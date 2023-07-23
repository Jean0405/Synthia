console.clear();
import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import USUARIO from "./ROUTES/endpointUsuarios.js";
import PROYECTO from "./ROUTES/endpointProyectos.js";
import MODULO from "./ROUTES/endpointModulos.js";
import ESTADO from "./ROUTES/endpointEstados.js";
import { validateToken } from "./AUTH/tokensAuth.js";

dotenv.config();
const CONFIG = JSON.parse(process.env.MY_CONFIG);
const APP = express();

APP.use(express.json());
APP.use(cookieParser());

APP.use("/usuario", USUARIO);
APP.use("/proyecto", PROYECTO);
APP.use("/modulo", MODULO);
APP.use("/estado", ESTADO);

APP.listen(CONFIG, () => {
  console.log(`http://${CONFIG.hostname}:${CONFIG.port}`);
});
