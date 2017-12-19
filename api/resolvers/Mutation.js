exports.publishEssay = async (_, { input }, { models, request }) => {
  const { token } = request;

  if (process.env.NODE_ENV === 'production') {
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
    await models.Essay.commit(input);
  } catch (error) {
    throw new Error('Failed to commit the file to GitHub.');
  }

  return true;
};
