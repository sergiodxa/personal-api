exports.publishEssay = async (_, { input }, { models, request }) => {
  if (process.env.NODE_ENV === 'production') {
    const { token } = request;
    if (token !== process.env.API_TOKEN) {
      throw new Error('Not Authorized.');
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
    throw new Error('Failed to commit the file to GitHub.');
  }

  return true;
};

exports.subscribe = async (_, { email }, { models }) => {
  return await models.Subscription.subscribe(email);
};
