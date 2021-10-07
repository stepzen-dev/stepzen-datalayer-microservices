const JsonWebToken = require('jsonwebtoken');
const Bcrypt = require('bcryptjs');
const localtunnel = require('localtunnel');
const jsonServer = require('json-server');

const { JWT_SECRET } = require('../authMiddleware');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const user = {
  id: 1,
  client_id: 'test',
  client_secret: '$2a$12$Vr6Npat/hCWmxAlFySrBMu76Lq.rLJ8rDLBcbmdeiKstKKpfxwfeO',
};

server.get('/api/token', async (req, res) => {
  if (
    req.query.grant_type === 'client_credentials' &&
    req.query.client_id === 'test'
  ) {
    Bcrypt.compare(
      req.query.client_secret,
      user.client_secret,
      (error, result) => {
        if (!error && result) {
          res.jsonp({
            id: user.id,
            access_token: JsonWebToken.sign({ user: user.id }, JWT_SECRET, {
              expiresIn: 3600,
            }),
          });
        } else {
          res.sendStatus(401);
        }
      },
    );
  } else {
    res.sendStatus(401);
  }
});

const PORT = 3001;

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use('/api', router);
server.listen(PORT, () => {
  (async () => {
    const tunnel = await localtunnel({ port: PORT });
    console.log(`Auth service is running on ${tunnel.url}`);
  })();
});
