import { plainToInstance } from "class-transformer";
import { Modulo } from "../controller/moduloDTO.js";

const proxyModulo = (req, res, next) => {
  try {
    req.body = plainToInstance(Modulo, req.body, {
      excludeExtraneousValues: true,
    });
    next();
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};

export default proxyModulo;
