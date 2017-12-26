require('now-env');

const Grial = require('@grial/server');
const express = require('express');

const api = new Grial(process.env);
const handle = api.getRequestHandler();

async function main() {
  await api.prepare();

  const server = express();

  if (!process.env.NOW) {
    const morgan = require('morgan');
    server.use(morgan('common'));
  }

  server.use(handle);

  server.listen(3002);
}

function errorHandler(error) {
  console.error(error);
  process.exit(0);
}

main().catch(errorHandler);
