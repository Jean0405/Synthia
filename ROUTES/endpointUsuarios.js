import { Router } from "express";
import mysql from "mysql2/promise";
import proxyUsuario from "../MIDDLEWARE/proxyUsuario.js";

const USUARIO = Router();
let conn = undefined;

USUARIO.use((req, res, next) => {
  try {
    let CONFIG_CONN = JSON.parse(process.env.MY_CONNECTION);
    conn = mysql.createPool(CONFIG_CONN);
    next();
  } catch (error) {
    res.send(error + "-> CONNECTION ERROR");
  }
});

USUARIO.post("/", proxyUsuario, async (req, res) => {
  try {
    await conn.query(`INSERT INTO usuarios SET ?`, req.body);
    res.send("DATA INSERTED");
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR TO INSERT DATA", error: error.message });
  }
});

export default USUARIO;
