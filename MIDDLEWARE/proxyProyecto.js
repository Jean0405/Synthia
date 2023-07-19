import { plainToInstance } from "class-transformer";
import { Proyecto } from "../controller/proyectoDTO.js";

const proxyProyecto = (req, res, next) => {
  try {
    req.body = plainToInstance(Proyecto, req.body, {
      excludeExtraneousValues: true,
    });
    next();
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};

export default proxyProyecto;
