const strip = require("strip");

function toArray(v) {
  return Array.isArray(v) ? v : [v];
}

module.exports = async ({ ses, analytics }) => {
  return {
    sendEmail({ subject, to, body: { html, text }, from, replyTo }) {
      // define email parameters
      const params = {
        Source: from,
        Destination: {
          ToAddresses: toArray(to)
        },
        Message: {
          Body: {
            Html: {
              Data: html
            },
            Text: {
              Data: text || strip(html)
            }
          },
          Subject: {
            Data: subject
          }
        },
        ReplyToAddresses: toArray(replyTo)
      };

      return new Promise((resolve, reject) => {
        ses.sendEmail(params, (err, data) => {
          if (err) {
            // eslint-disable-next-line no-console
            console.error(err, err.stack);
            analytics({
              action: "API - SES",
              description: `Email ${subject} to ${to} failed`,
              type: "error"
            });
            return reject(err);
          }
          analytics({
            action: "API - SES",
            description: `Email ${subject} to ${to} sent`,
            type: "info"
          });
          return resolve(data);
        });
      });
    }
  };
};
