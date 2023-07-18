import { plainToClass } from "class-transformer";
import { Usuario } from "../controller/usuarioDTO.js";

const proxyUsuario = (req, res, next) => {
  try {
    req.body = plainToClass(Usuario, req.body, {
      excludeExtraneousValues: true,
    });
    next();
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};

export default proxyUsuario;
