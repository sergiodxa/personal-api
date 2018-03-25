const frontmatter = require("frontmatter");

const cache = new Map();

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

module.exports = async ({ fs, gh, analytics }) => {
  return {
    async retrieve(slug) {
      if (cache.has(slug)) {
        const { content, meta, sha } = cache.get(slug);

        if (!meta.published && process.env.NODE_ENV === "production") {
          throw new Error("The essay is not published.");
        }

        return { content, meta, sha };
      }

      const response = await gh(
        `/repos/sergiodxa/personal-data/contents/essays/${slug}.md`
      );

      const { content: rawContent, sha } = await response.json();

      const essay = Buffer.from(rawContent, "base64").toString();

      const { content, meta } = parseEssay(essay);

      if (!meta.published && process.env.NODE_ENV === "production") {
        throw new Error("The essay is not published.");
      }

      cache.set(slug, { content, meta, sha });

      return { content, meta, sha };
    },

    async create(input) {
      analytics({
        type: "info",
        action: "API - Essay",
        description: "Publishing new essay"
      });

      const content = formatEssay(input);
      const buffer = Buffer.from(content, "utf8");

      const response = await gh(
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
