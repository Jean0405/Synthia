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

/* CREAR USUARIOS */
USUARIO.post("/", proxyUsuario, async (req, res) => {
  // {
  //   "id":1005372571,
  //   "nombre":"Cristian Diaz",
  //   "email":"akio@hotmail.com",
  //   "contrasena":"akio123",
  //   "id_rol":1
  // }
  try {
    await conn.query(`INSERT INTO usuarios SET ?`, req.body);
    res.send("DATA INSERTED");
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR TO INSERT USER", error: error.message });
  }
});

/*ELIMINAR USUARIOS */
USUARIO.delete("/:id", proxyUsuario, async (req, res) => {
  try {
    await conn.execute(`DELETE FROM usuarios WHERE id = ?`, [req.params.id]);
    res.send("DATA DELETE");
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR TO DELETE USER", error: error.message });
  }
});

/*ACTUALIZAR USUARIOS */
USUARIO.put("/:id_user", proxyUsuario, async (req, res) => {
  const { id_user } = req.params;
  const { id, nombre, email, contrasena, id_rol } = req.body;
  console.log(req.body);
  try {
    await conn.execute(
      `UPDATE usuarios SET id = ?, nombre = ?, email = ?, contrasena = ?, id_rol = ? WHERE id = ?`,
      [id, nombre, email, contrasena, id_rol, id_user]
    );
    res.send("DATA UPDATED");
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR TO UPDATE USER", error: error.message });
  }
});

export default USUARIO;
