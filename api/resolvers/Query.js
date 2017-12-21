exports.getEssay = async (_, { slug }, { models }) => {
  const { meta, content } = await models.Essay.retrieve(slug);
  return {
    slug,
    ...meta,
    content
  };
};
