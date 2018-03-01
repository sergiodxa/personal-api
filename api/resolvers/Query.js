exports.getEssay = async (_, { slug }, { models }) => {
  console.log(models.Essay);
  const { meta, content } = await models.Essay.retrieve(slug);
  return {
    slug,
    ...meta,
    content
  };
};

exports.getShortenedUrls = async (_, args, { models }) => {
  const { content } = await models.Short.retrieve();
  return Object.entries(content).map(([short, long]) => ({ short, long }));
};
