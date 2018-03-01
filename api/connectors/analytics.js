const fetch = require("node-fetch");
const { stringify } = require("querystring");

module.exports = async () => {
  return ({ action, description, type = "event" }) => {
    const ROOT_URL = "https://analytics.sergiodxa.com";

    const query = stringify({ action, description, type });

    return fetch(`${ROOT_URL}?${query}`);
  };
};
