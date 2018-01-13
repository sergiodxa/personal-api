const { resolve } = require("path");
const frontmatter = require("frontmatter");

function parseEssay(rawContent) {
  const { data: meta, content } = frontmatter(rawContent);

  return { content, meta };
}

function formatEssay({ content, ...meta }) {
  const frontMatter = Object.entries({
    ...meta,
    date: new Date().toJSON()
  }).map(([key, value]) => `${key}: ${value}`);

  return `---\n${frontMatter}\n---\n${content}`;
}

module.exports = async ({ fs, gh }) => {
  return {
    async retrieve(slug) {
      const essay = await fs.read(resolve(`./data/essays/${slug}.md`), "utf-8");

      const { content, meta } = parseEssay(essay);

      if (!meta.published && process.env.NODE_ENV === "production") {
        throw new Error("The essay is not published.");
      }

      return { content, meta };
    },

    async create(input) {
      const content = formatEssay(input);
      const buffer = Buffer.from(content, "utf8");

      const response = await connectors.gh(
        `/repos/sergiodxa/personal-data/contents/essays/${slug}.md`,
        {
          method: "PUT",
          body: JSON.stringify({
            message: `Publish essay ${input.title}`,
            committer: {
              name: "Sergio Xalambrí",
              email: "sergiodxa@gmail.com"
            },
            content: buffer.toString("base64")
          })
        }
      );
      return await response.json();
    }
  };
};
