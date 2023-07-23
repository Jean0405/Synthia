import { plainToInstance } from "class-transformer";
import { ModulosEstados } from "../controller/modulos_estadosDTO.js";

const proxyModulosEstados =
  ("/:user_id/:modStatus_id",
  (req, res, next) => {
    req.params.user_id = Number(req.params.user_id);
    req.params.modStatus_id = Number(req.params.modStatus_id);
    req.data = { ...req.params, ...req.body };

    try {
      req.body = plainToInstance(ModulosEstados, req.data, {
        excludeExtraneousValues: true,
      });
      next();
    } catch (error) {
      res.status(error.status).send(error.message);
    }
  });

export default proxyModulosEstados;
