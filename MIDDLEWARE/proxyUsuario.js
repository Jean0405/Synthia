import { plainToInstance } from "class-transformer";
import { Usuario } from "../controller/usuarioDTO.js";
import { generateToken } from "../AUTH/tokensAuth.js";

const proxyUsuario = async (req, res, next) => {
  try {
    req.body = plainToInstance(Usuario, req.body, {
      excludeExtraneousValues: true,
    });

    req.auth = await generateToken(req.body, process.env.JWT_PRIVATE_KEY);

    next();
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};

export default proxyUsuario;
