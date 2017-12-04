const { resolve } = require('path');
const extractMeta = require('./lib/extract-meta');

exports.Essay = async ({ fs }) => {
  return {
    async getEssay(slug) {
      const rawContent = await fs.read(resolve(`./essays/${slug}.md`), 'utf-8');
      return extractMeta(rawContent);
    }
  };
};
