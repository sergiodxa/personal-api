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
