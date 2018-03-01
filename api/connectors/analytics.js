const fetch = require("node-fetch");
const { stringify } = require("querystring");

module.exports = async ({ NODE_ENV }) => {
  return ({ action, description, type = "event" }) => {
    if (NODE_ENV !== "production") {
      return Promise.resolve();
    }

    const ROOT_URL = "https://analytics.sergiodxa.com";

    const query = stringify({ action, description, type });

    return fetch(`${ROOT_URL}?${query}`);
  };
};
