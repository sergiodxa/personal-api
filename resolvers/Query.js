exports.getEssay = async (_, { slug }, { models }) => {
  const rawContent = await models.Essay.getEssay(slug);
  const { meta, content } = models.Essay.parseEssay(rawContent);
  return {
    slug,
    ...meta,
    content
  };
};
