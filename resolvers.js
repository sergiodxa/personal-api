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
  async publishEssay(_, { input }, { connectors, request }) {
    const { token } = request;

    if (process.env.NODE_ENV === 'production') {
      if (token !== process.env.API_TOKEN) {
        throw new Error('Not Authorized.');
      }
    }

    const { slug, content, title, description } = input;

    const buffer = Buffer.from(
      `---
title: ${title}
date: ${new Date().toJSON()}
description: ${description}
slug: ${slug}
---
${content}`,
      'utf8'
    );

    let ghBody;
    try {
      const ghResponse = await connectors.gh(
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
      ghBody = await ghResponse.json();
    } catch (error) {
      throw new Error('Failed to commit the file to GitHub.');
    }

    return true;
  }
};
