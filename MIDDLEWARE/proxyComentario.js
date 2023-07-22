import { plainToInstance } from "class-transformer";
import { Comentario } from "../controller/comentarioDTO.js";

const proxyComentario =
  ("/:user_id/:id/:mod_id",
  (req, res, next) => {
    req.params.user_id = Number(req.params.user_id);
    req.params.id = Number(req.params.id);
    req.params.mod_id = Number(req.params.mod_id);

    req.data = { ...req.params, ...req.body };

    try {
      req.body = plainToInstance(Comentario, req.data, {
        excludeExtraneousValues: true,
      });
      next();
    } catch (error) {
      res.status(error.status).send(error.message);
    }
  });

export default proxyComentario;
