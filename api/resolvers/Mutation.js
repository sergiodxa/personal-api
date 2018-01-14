const auth = require("../lib/auth");

exports.publishEssay = async (_, { input }, { models, request }) => {
  if (process.env.NODE_ENV === "production") {
    const { token } = request;
    if (token !== auth.token) {
      throw new Error("Not Authorized.");
    }
  }

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
};

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

exports.shortUrl = async (_, { long, short }, { models }) => {
  if (process.env.NODE_ENV === "production") {
    const { token } = request;
    if (token !== auth.token) {
      throw new Error("Not Authorized.");
    }
  }

  await models.Short.add({ long, short });

  return { long, short };
};
