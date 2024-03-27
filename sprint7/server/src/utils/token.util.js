import jwt from "jsonwebtoken";

function createToken(data) {
  const token = jwt.sign(data, process.env.SECRET, {
    expiresIn: 60 * 60 * 24 * 7,
  });
  return token;
}

function verifytoken(token) {
  if (token) {
    const data = jwt.verify(token, process.env.SECRET);
    // ¿qué pasa si data no verifica o si el token fue modificado? ¿como lo condiciono?
    return data;
  }
  const error = new Error("bad auth token");
  error.statusCode = 401;
  throw error;
}

export { createToken, verifytoken };