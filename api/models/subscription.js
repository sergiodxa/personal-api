const { isEmail } = require('validator');

module.exports = async ({ mailchimp, MAILCHIMP_LIST_ID }) => {
  return {
    async subscribe(email) {
      if (!isEmail(email)) {
        throw new Error('The email address is invalid.');
      }

      const response = await mailchimp(`/lists/${MAILCHIMP_LIST_ID}/members`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const { title, status, detail } = await response.json();
      if (status > 299) {
        throw new Error(`${title}: ${detail}`);
      }
      return true;
    }
  };
};
