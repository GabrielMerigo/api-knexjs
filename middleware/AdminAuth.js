const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (authorization !== undefined) {
      const bearer = authorization.split(" ");
      const token = bearer[1];
      const decodedToken = jwt.verify(token, "my_super_secret_key");

      console.log(decodedToken);

      if (decodedToken.role === 1) {
        next();
      } else {
        res.status(403);
        return res.send("Você não tem permissão!");
      }
    } else {
      res.status(400);
      return res.send("Você não está autenticado!");
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = auth;
