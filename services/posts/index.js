const path = require('path');
const localtunnel = require('localtunnel');
const jsonServer = require('json-server');

const { authMiddleware } = require('../authMiddleware');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

const PORT = 3003;

server.use(jsonServer.bodyParser);

server.use(middlewares);
server.use(authMiddleware);

server.use('/api', router);
server.listen(PORT, () => {
  (async () => {
    const tunnel = await localtunnel({ port: PORT });
    console.log(`Posts service is running on ${tunnel.url}`);
  })();
});
