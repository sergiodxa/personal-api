const fetch = require('node-fetch');

module.exports = async ({ GITHUB_TOKEN }) => {
  return (url, options = {}) => {
    const ROOT_URL = 'https://api.github.com';

    return fetch(`${ROOT_URL}${url}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `token ${GITHUB_TOKEN}`
      }
    });
  };
};
