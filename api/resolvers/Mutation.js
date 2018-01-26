const auth = require("../lib/auth.js");
const private = require("../lib/private.js");
const newsletterTemplate = require("../lib/newsletter-template.js");

exports.publishEssay = private(async (_, { input }, { models, request }) => {
  if (input.description.length > 140) {
    throw new Error(
      `The essays description is too long, it's ${
        input.description.length
      } characters long, and the maximum allowed is 140.`
    );
  }

  try {
    await models.Essay.create(input);
  } catch (error) {
    throw new Error("Failed to commit the file to GitHub.");
  }

  return true;
});

exports.subscribe = async (_, { email }, { models }) => {
  return await models.Subscription.subscribe(email);
};

exports.login = async (_, { email }, { models }) => {
  if (email !== "hello@sergiodxa.com" && email !== "sergiodxa@gmail.com") {
    throw new Error("Invalid email address. You're not allowed to login");
  }

  return await new Promise((resolve, reject) => {
    const token = auth.attempt((error, token) => {
      if (error) return reject(error);
      return resolve(token);
    });

    const url = `https://api.sergiodxa.com/login?token=${token}`;

    models.SES.sendEmail({
      subject: "Login attempt at SDX.im",
      to: email,
      from: "hello@sergiodxa.com",
      replyTo: "hello@sergiodxa.com",
      body: {
        html: `You tried to login with this email address on sergiodxa.com.
To confirm the login go to:

<a href="${url}">${url}</a>`
      }
    }).catch(reject);
  });
};

exports.shortUrl = private(async (_, { long, short }, { models }) => {
  await models.Short.add({ long, short });

  return { long, short };
});

exports.sendNewsletter = private(async (_, { input }, { models }) => {
  const { title, emails, links, description } = input;

  await Promise.all(
    emails.map(email => {
      const token = Buffer.from(email)
        .toString("base64")
        .split("")
        .reverse()
        .join("")
        .slice(2)
        .split("")
        .reverse()
        .join("");

      return models.SES.sendEmail({
        subject: title,
        to: email,
        from: "hello@sergiodxa.com",
        replyTo: "hello@sergiodxa.com",
        body: {
          html: newsletterTemplate({ description, token, links })
        }
      });
    })
  );

  return true;
});
