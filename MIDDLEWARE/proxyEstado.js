import { plainToInstance } from "class-transformer";
import { Estado } from "../controller/estadoDTO.js";

const proxyEstado =
  ("/:user_id/:status_id",
  (req, res, next) => {
    req.params.user_id = Number(req.params.user_id);
    req.params.status_id = Number(req.params.status_id);
    req.data = { ...req.params, ...req.body };

    try {
      req.body = plainToInstance(Estado, req.data, {
        excludeExtraneousValues: true,
      });
      next();
    } catch (error) {
      res.status(error.status).send(error.message);
    }
  });

export default proxyEstado;
