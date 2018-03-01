const fetch = require("node-fetch");

module.exports = async ({ NODE_ENV }) => {
  return ({ action, description, type = "event" }) => {
    if (NODE_ENV !== "production") {
      return Promise.resolve();
    }

    const ROOT_URL = "https://analytics.sergiodxa.com";

    return fetch(ROOT_URL, {
      method: "POST",
      body: JSON.stringify({
        action,
        description,
        type
      })
    });
  };
};
