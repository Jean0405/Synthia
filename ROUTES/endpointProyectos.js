import { Router } from "express";
import mysql from "mysql2/promise";
import proxyProyecto from "../MIDDLEWARE/proxyProyecto.js";

const PROYECTO = Router();
let conn = undefined;

PROYECTO.use((req, res, next) => {
  try {
    let CONFIG_CONN = JSON.parse(process.env.MY_CONNECTION);
    conn = mysql.createPool(CONFIG_CONN);
    next();
  } catch (error) {
    res.send(error + "-> CONNECTION ERROR");
  }
});

/*CREAR PROYECTOS*/
PROYECTO.post("/", proxyProyecto, async (req, res) => {
  // {
  //   "nombre":"Gestor proyectos",
  //   "descripcion":"Gestor de proyectos y documentacion",
  //   "fecha_creacion":"2023-07-17"
  // }
  try {
    await conn.query(`INSERT INTO proyectos SET ?`, req.body);
    res.send("DATA INSERTED");
  } catch (error) {
    res
      .status()
      .json({ message: "ERROT TO INSERT PROJECT", error: error.message });
  }
});

/*LISTAR PROYECTOS */
PROYECTO.get("/", async (req, res) => {
  const [rows, fields] = await conn.execute(
    `SELECT nombre, descripcion, fecha_creacion FROM proyectos`
  );
  res.send(rows);
});

/*ELIMINAR PROYECTOS */
PROYECTO.delete("/:user_id/:project_id", proxyProyecto, async (req, res) => {
  const { user_id, project_id } = req.params;
  try {
    const [rows, fields] = await conn.execute(
      `SELECT usuarios.nombre, roles.nombre AS rol FROM usuarios INNER JOIN roles ON usuarios.id_rol = roles.id WHERE usuarios.id = ?`,
      [user_id]
    );
    if (rows.length == 0) {
      res.send("YOU ARE NOT REGISTERED");
    } else {
      const [rowsP, fields] = await conn.execute(
        `SELECT COUNT(*) AS total FROM proyectos WHERE id = ?`,
        [project_id]
      );
      if (rowsP[0].total == 0) {
        res.send("THIS PROJECT DOESN'T EXIST");
      } else {
        if (rows[0].rol !== "admin") {
          res.send("YOU DO NOT HAVE PERMISSION TO PERFORM THIS ACTION");
        } else {
          await conn.execute(`DELETE FROM proyectos WHERE id = ?`, [
            project_id,
          ]);
          res.send("PROJECT HAS BEEN DELETED");
        }
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "ERROR TO DELETE PROYECT", error: error.message });
  }
});

export default PROYECTO;
