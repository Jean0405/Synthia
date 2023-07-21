import { plainToInstance } from "class-transformer";
import { ModulosUsuarios } from "../controller/modulos_usuarios.js";

const proxyModulosUsuarios =
  ("/:user_id",
  (req, res, next) => {
    req.params.user_id = Number(req.params.user_id);
    req.data = { ...req.params, ...req.body };
    try {
      req.body = plainToInstance(ModulosUsuarios, req.data, {
        excludeExtraneousValues: true,
      });
      // req.params = plainToInstance(ModulosUsuarios, req.params, {
      //   excludeExtraneousValues: true,
      // });
      // console.log(req.params.user_id);
      next();
    } catch (error) {
      res.status(error.status).send(error.message);
    }
  });

export default proxyModulosUsuarios;
