import { Router } from "express";
import mysql from "mysql2/promise";
import proxyEstado from "../MIDDLEWARE/proxyEstado.js";
import { validateToken } from "../AUTH/tokensAuth.js";

const ESTADO = Router();
let conn = undefined;

ESTADO.use((req, res, next) => {
  try {
    let CONFIG_CONN = JSON.parse(process.env.MY_CONNECTION);
    conn = mysql.createPool(CONFIG_CONN);
    next();
  } catch (error) {
    res.send(error + "-> CONNECTION ERROR");
  }
});

//Middleware para validar token
ESTADO.use(validateToken);

/* CREAR ESTADOS */
ESTADO.post("/:user_id", proxyEstado, async (req, res) => {
  // {
  //   "nombre":"FINALIZADO",
  // }
  const { user_id, nombre } = req.body;
  console.log(req.body);
  try {
    //Validamos si el usuario está registrado
    const [rows, fields] = await conn.execute(
      `SELECT usuarios.nombre, roles.nombre AS rol FROM usuarios INNER JOIN roles ON usuarios.id_rol = roles.id WHERE usuarios.id = ?`,
      [user_id]
    );
    if (rows.length == 0) {
      res.send("YOU ARE NOT REGISTERED");
    } else {
      //Validamos si el usuario tiene los permisos necesarios
      if (rows[0].rol !== "admin") {
        res.send("YOU DO NOT HAVE PERMISSION TO PERFORM THIS ACTION");
      } else {
        //Si cumple todo, realizamos el POST
        await conn.query(`INSERT INTO estados SET ?`, { nombre });
        res.send("DATA INSERTED");
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR TO INSERT DATA", error: error.message });
  }
});

/* ELIMINAR ESTADOS */
ESTADO.delete("/:user_id/:status_id", proxyEstado, async (req, res) => {
  const { user_id, status_id } = req.body;
  try {
    const [rows, fields] = await conn.execute(
      `SELECT usuarios.*, roles.nombre AS rol FROM usuarios
      INNER JOIN roles ON usuarios.id_rol = roles.id
      WHERE usuarios.id = ?`,
      [user_id]
    );
    if (rows.length == 0) {
      res.send("YOU ARE NOT REGISTERED");
    } else {
      const [rowsM, fieldsM] = await conn.execute(
        `SELECT * FROM estados WHERE id = ?`,
        [status_id]
      );
      if (rowsM.legnth == 0) {
        res.send("THIS STATUS DOESN'T EXIST");
      } else {
        if (rows[0].rol !== "admin") {
          res.send("YOU DO NOT HAVE PERMISSION TO PERFORM THIS ACTION");
        } else {
          await conn.execute(`DELETE FROM estados WHERE id = ?`, [status_id]);
          res.send("STATUS HAS BEEN DELETED");
        }
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR TO DELETE MODULE", error: error.message });
  }
});

export default ESTADO;
