const fetch = require('node-fetch');

exports.fs = require('@grial/connector-fs');

exports.gh = async ({ GITHUB_TOKEN }) => {
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
