const fetch = require('node-fetch');

function format({ username, password, hostname, protocol, pathname }) {
  return `${protocol}://${username}:${password}@${hostname}/${pathname}`;
}

module.exports = async ({ MAILCHIMP_API_TOKEN }) => {
  return (url, options = {}) => {
    const dc = MAILCHIMP_API_TOKEN.split('-')[1];

    const URL = format({
      username: 'sergiodxa',
      password: MAILCHIMP_API_TOKEN,
      hostname: `${dc}.api.mailchimp.com`,
      protocol: 'https',
      pathname: `3.0${url}`
    });

    console.log(URL);

    return fetch(URL, options);
  };
};
