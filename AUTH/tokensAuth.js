import { SignJWT, jwtVerify } from "jose";

export const generateToken = async (jsonData, privateKey) => {
  try {
    const encoder = new TextEncoder();
    const jwtconstructor = new SignJWT({ jsonData });
    return jwtconstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("3h")
      .sign(encoder.encode(privateKey));
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};

export const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(401).send({ token: "ERRONEOUS OR EXPIRED TOKEN" });
  const encoder = new TextEncoder();
  try {
    res.data = await jwtVerify(
      authorization,
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );
    next();
  } catch (error) {
    res.status(error.status).send(error.message);
  }
};
