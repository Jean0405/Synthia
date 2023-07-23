import { Router } from "express";
import mysql from "mysql2/promise";
import proxyUsuario from "../MIDDLEWARE/proxyUsuario.js";
import { validateToken } from "../AUTH/tokensAuth.js";

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

USUARIO.use((req, res, next) => {
  // Si la ruta es /post, no se requiere autenticación, pasa al siguiente middleware (o controlador)
  if (req.path === "/post") {
    return next();
  }

  // Para todas las demás rutas, aplicar el middleware de verificación del token JWT
  validateToken(req, res, next);
});

/* CREAR USUARIOS */
USUARIO.post("/post", proxyUsuario, async (req, res) => {
  // {
  //   "id":1005372571,
  //   "nombre":"Cristian Diaz",
  //   "email":"akio@hotmail.com",
  //   "contrasena":"akio123",
  //   "id_rol":1
  // }
  try {
    await conn.query(`INSERT INTO usuarios SET ?`, req.body);
    res.cookie("USER TOKEN", req.auth, { httpOnly: true });
    res.send({ MESSAGE: "REGISTERED USER", JWT: req.auth });
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR TO INSERT USER", error: error.message });
  }
});

USUARIO.get("/get", async (req, res) => {
  const [rows, fields] = await conn.execute(
    `SELECT usuarios.id, usuarios.nombre, usuarios.email, roles.nombre AS rol FROM usuarios INNER JOIN roles ON usuarios.id_rol = roles.id`
  );
  res.send(rows);
});

/*ELIMINAR USUARIOS*/
USUARIO.delete("/delete/:id", proxyUsuario, async (req, res) => {
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
USUARIO.put("/put/:id_user", proxyUsuario, async (req, res) => {
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
