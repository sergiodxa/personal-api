require("now-env");

const { PORT = 3002 } = process.env;

const Grial = require("@grial/server");
const express = require("express");

const api = new Grial(process.env);
const handle = api.getRequestHandler();

async function main() {
  await api.prepare();

  const server = express();

  if (!process.env.NOW) {
    const morgan = require("morgan");
    server.use(morgan("common"));
  }

  server.use(handle);

  server.listen(PORT);
}

function errorHandler(error) {
  console.error(error);
  process.exit(0);
}

main()
  .then(() => console.log(`API running on port ${PORT}`))
  .catch(errorHandler);
