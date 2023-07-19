console.clear();
import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import USUARIO from "./ROUTES/endpointUsuarios.js";
import PROYECTO from "./ROUTES/endpointProyectos.js";

dotenv.config();
const CONFIG = JSON.parse(process.env.MY_CONFIG);
const APP = express();

APP.use(express.json());
APP.use("/usuario", USUARIO);
APP.use("/proyecto", PROYECTO);

APP.listen(CONFIG, () => {
  console.log(`http://${CONFIG.hostname}:${CONFIG.port}`);
});
