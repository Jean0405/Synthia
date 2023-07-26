import { plainToInstance } from "class-transformer";
import { Usuario } from "../controller/usuarioDTO.js";

const proxyUsuario = async (req, res, next) => {
  try {
    req.body = plainToInstance(Usuario, req.body, {
      excludeExtraneousValues: true,
    });
    next();
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};

export default proxyUsuario;
