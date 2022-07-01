const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const { MONGO_URL, PORT, dev, ROOT_URL } = require('../config');
const auth = require('./auth/basic');
const instagramAuth = require('./auth/instagram');
const googleAuth = require('./auth/google');
//const facebookAuth = require('./auth/facebook');
const api = require('./api');
const logger = require('./logs');
const httpMiddleware = require('./middleware/http');

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
mongoose.connect(MONGO_URL, options);
const URL_MAP = {
  '/acceuil': '/',
  '/login': '/public/login',
  '/': '/dashboard',
};
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();

  // give all Nextjs's request to Nextjs server
  server.get('/_next/*', (req, res) => {
    handle(req, res);
  });

  server.use(httpMiddleware(server, express));

  auth({ server, ROOT_URL });
  googleAuth({ server, ROOT_URL });
  // instagramAuth({ app, ROOT_URL });
  //facebookAuth({ server, ROOT_URL });
  api(server);

  server.get('*', (req, res) => {
    const url = URL_MAP[req.path];

    if (url) {
      app.render(req, res, url);
    } else {
      handle(req, res);
    }
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    logger.info(`> Ready on ${ROOT_URL}`);
  });
});
