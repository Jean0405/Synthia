import mysql from "mysql2/promise";
import { Router } from "express";
import proxyModulo from "../MIDDLEWARE/proxyModulo.js";

const MODULO = Router();
let conn = undefined;

MODULO.use((req, res, next) => {
  try {
    const CONFIG_CONN = JSON.parse(process.env.MY_CONNECTION);
    conn = mysql.createPool(CONFIG_CONN);
    next();
  } catch (error) {
    res.send(error + "-> CONNECTION ERROR");
  }
});

/*CREAR MÓDULOS */
MODULO.post("/:user_id", proxyModulo, async (req, res) => {
  // {
  //   "nombre":"Frontend del LOGIN",
  //   "descripcion":"blah blah blah",
  //   "id_proyecto":1
  // }
  try {
    const { user_id } = req.params;
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
        await conn.query(`INSERT INTO modulos SET ?`, req.body);
        res.send("DATA INSERTED");
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR TO INSERT DATA", error: error.message });
  }
});

/*LISTAR MÓDULOS */
MODULO.get("/", async (req, res) => {
  try {
    const [rows, fields] =
      await conn.execute(`SELECT  modulos.id, modulos.nombre AS modulo, modulos.descripcion, proyectos.nombre AS nombre_proyecto
    FROM modulos
    INNER JOIN proyectos ON modulos.id_proyecto = proyectos.id`);
    res.send(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR TO GET MODULES", error: error.message });
  }
});

/*EDITAR MODULOS*/
MODULO.put("/:user_id/:mod_id", proxyModulo, async (req, res) => {
  const { user_id, mod_id } = req.params;
  const { nombre, descripcion, id_proyecto } = req.body;
  try {
    //Validamos si el usuario existe
    const [rows, fields] = await conn.execute(
      `SELECT usuarios.nombre, roles.nombre AS rol FROM usuarios INNER JOIN roles ON usuarios.id_rol = roles.id WHERE usuarios.id = ?`,
      [user_id]
    );
    if (rows.length == 0) {
      res.send("YOU ARE NOT REGISTERED");
    } else {
      //Validamos si el proyecto existe
      const [rowsM, fieldsP] = await conn.execute(
        `SELECT COUNT(*) AS total FROM modulos WHERE id = ?`,
        [mod_id]
      );
      if (rowsM[0].total == 0) {
        res.send("MODULE DOESN'T EXIST");
      } else {
        //Validamos si el usuario tiene permisos necesarios
        if (rows[0].rol !== "admin") {
          res.send("YOU DO NOT HAVE PERMISSION TO PERFORM THIS ACTION");
        } else {
          //Si cumple todo, realizamos el UPDATE
          await conn.query(
            `UPDATE modulos
          SET
              nombre = ?,
              descripcion = ?,
              id_proyecto = ?
          WHERE id = ?`,
            [nombre, descripcion, id_proyecto, mod_id]
          );
          res.send("MODULE HAS BEEN UPDATED");
        }
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR TO UPDATE MODULE", error: error.message });
  }
});

/*ELIMINAR MÓDULOS*/
MODULO.delete("/:user_id/:mod_id", async (req, res) => {
  const { user_id, mod_id } = req.params;
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
        `SELECT * FROM modulos WHERE id = ?`,
        [mod_id]
      );
      if (rowsM.legnth == 0) {
        res.send("THIS MODULE DOESN'T EXIST");
      } else {
        if (rows[0].rol !== "admin") {
          res.send("YOU DO NOT HAVE PERMISSION TO PERFORM THIS ACTION");
        } else {
          await conn.execute(`DELETE FROM modulos WHERE id = ?`, [mod_id]);
          res.send("MODULE HAS BEEN DELETED");
        }
      }
    }
  } catch (error) {
    res
      .status(error.status)
      .json({ message: "ERROR TO UPDATE MODULE", error: error.message });
  }
});

export default MODULO;
