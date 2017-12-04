exports.Query = {
  async getEssay(_, { slug }, { models }) {
    const { meta, content } = await models.Essay.getEssay(slug);
    return {
      slug,
      ...meta,
      content
    };
  }
};

exports.Mutation = {
  async publishEssay(_, { input }, { models, request }) {
    const { token } = request;

    if (process.env.NODE_ENV === 'production') {
      if (token !== process.env.API_TOKEN) {
        throw new Error('Not Authorized.');
      }
    }

    const content = models.Essay.formatEssay(input);

    try {
      await models.Essay.commit({ content, ...input });
    } catch (error) {
      throw new Error('Failed to commit the file to GitHub.');
    }

    return true;
  }
};
