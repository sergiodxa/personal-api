const { resolve } = require('path');
const extractMeta = require('./lib/extract-meta');

exports.Essay = async ({ fs, gh }) => {
  return {
    async getEssay(slug) {
      const rawContent = await fs.read(resolve(`./essays/${slug}.md`), 'utf-8');
      return extractMeta(rawContent);
    },

    async commit({ slug, content, title }) {
      const buffer = Buffer.from(content, 'utf8');

      const response = await connectors.gh(
        `/repos/sergiodxa/personal-api/contents/essays/${slug}.md`,
        {
          method: 'PUT',
          body: JSON.stringify({
            message: `Publish post ${title}`,
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

    formatEssay({ slug, content, title, description }) {
      return `---
title: ${title}
date: ${new Date().toJSON()}
description: ${description}
slug: ${slug}
---
${content}`;
    }
  };
};
