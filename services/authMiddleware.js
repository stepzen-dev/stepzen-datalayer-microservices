const JsonWebToken = require('jsonwebtoken');

const JWT_SECRET = '34%%##@#FGFKFL';

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const bearerToken = token && token.split(' ');

  if (bearerToken) {
    JsonWebToken.verify(bearerToken[1], JWT_SECRET, (error) => {
      if (!error) {
        next();
      } else {
        res.sendStatus(401);
      }
    });
  } else {
    res.sendStatus(401);
  }
}

exports.JWT_SECRET = JWT_SECRET;
exports.authMiddleware = authMiddleware;
