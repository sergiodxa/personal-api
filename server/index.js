if (!process.env.NOW) require('now-env');

const Grial = require('@grial/server');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');

const api = new Grial(process.env);
const handle = api.getRequestHandler();

async function main() {
  await api.prepare();

  const server = express();

  server.use(compression());

  if (!process.env.NOW) {
    server.use(morgan('common'));
  }

  server.use(handle);

  server.listen(3000);
}

function errorHandler(error) {
  console.error(error);
  process.exit(0);
}

main().catch(errorHandler);
