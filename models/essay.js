const { resolve } = require('path');
const frontmatter = require('frontmatter');

module.exports = async ({ fs, gh }) => {
  return {
    async getEssay(slug) {
      try {
        return await fs.read(resolve(`./data/essays/${slug}.md`), 'utf-8');
      } catch (error) {
        throw new ReferenceError("The essay doesn't exits");
      }
    },

    async commit({ slug, content, title }) {
      const buffer = Buffer.from(content, 'utf8');

      const response = await connectors.gh(
        `/repos/sergiodxa/personal-data/contents/essays/${slug}.md`,
        {
          method: 'PUT',
          body: JSON.stringify({
            message: `Publish essay ${title}`,
            committer: {
              name: 'Sergio Xalambrí',
              email: 'sergiodxa@gmail.com'
            },
            content: buffer.toString('base64')
          })
        }
      );
      return await response.json();
    },

    parseEssay(rawContent) {
      const { data: meta, content } = frontmatter(rawContent);

      return { content, meta };
    },

    formatEssay({ content, ...meta }) {
      const frontMatter = Object.entries({
        ...meta,
        date: new Date().toJSON()
      }).map(([key, value]) => `${key}: ${value}`);

      return `---\n${frontMatter}\n---\n${content}`;
    }
  };
};
