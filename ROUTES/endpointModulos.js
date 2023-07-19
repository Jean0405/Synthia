import mysql from "mysql2/promise";
import { Router } from "express";

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
MODULO.post("/", async (req, res) => {
  // {
  //   "nombre":"Frontend del LOGIN",
  //   "descripcion":"blah blah blah",
  //   "id_proyecto":1
  // }
  try {
    await conn.query(`INSERT INTO modulos SET ?`, req.body);
    res.send("DATA INSERTED");
  } catch (error) {
    res
      .status(error.status)
      .json({ message: "ERROR TO INSERT DATA", error: error.message });
  }
});

/*LISTAR MÓDULOS */
MODULO.get("/", async (req, res) => {
  try {
    const [rows, fields] =
      await conn.execute(`SELECT  modulos.id AS id_modulo, modulos.nombre AS modulo, modulos.descripcion AS descripcion, proyectos.nombre AS nombre_proyecto
    FROM modulos
    INNER JOIN proyectos ON modulos.id_proyecto = proyectos.id`);
    res.send(rows);
  } catch (error) {
    res
      .status(error.status)
      .json({ message: "ERROR TO GET MODULES", error: error.message });
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
