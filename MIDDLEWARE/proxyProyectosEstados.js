import { plainToInstance } from "class-transformer";
import { ProyectosEstados } from "../controller/proyectos_estadosDTO.js";

const proxyProyectosEstados =
  ("/:user_id/:project_id",
  (req, res, next) => {
    req.params.user_id = Number(req.params.user_id);
    req.params.project_id = Number(req.params.project_id);
    req.data = { ...req.params, ...req.body };

    try {
      req.body = plainToInstance(ProyectosEstados, req.data, {
        excludeExtraneousValues: true,
      });
      next();
    } catch (error) {
      res.status(error.status).send(error.message);
    }
  });

export default proxyProyectosEstados;
