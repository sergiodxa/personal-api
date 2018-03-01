module.exports = async ({ gh, analytics }) => {
  return {
    async retrieve() {
      analytics({
        type: "info",
        action: "API - Shortening",
        description: "Retrieving list of shorted URLs"
      });
      const response = await gh(
        "/repos/sergiodxa/personal-shortening/contents/data/urls.json",
        {
          method: "GET"
        }
      );
      const { content, sha } = await response.json();
      const rawContent = Buffer.from(content, "base64").toString();
      return { content: JSON.parse(rawContent), sha };
    },

    async add({ long, short }) {
      analytics({
        type: "info",
        action: "API - Shortening",
        description: "Adding new short URL"
      });
      const { content, sha } = await this.retrieve();

      const newContent = Object.assign({}, content, {
        [short]: long
      });

      const buffer = Buffer.from(
        `${JSON.stringify(newContent, null, 2)}\n`,
        "utf8"
      );

      try {
        await gh(
          "/repos/sergiodxa/personal-shortening/contents/data/urls.json",
          {
            method: "PUT",
            body: JSON.stringify({
              message: `Add short URL from ${short} to ${long}`,
              committer: {
                name: "Sergio Xalambrí",
                email: "sergiodxa@gmail.com"
              },
              sha,
              content: buffer.toString("base64")
            })
          }
        );
        analytics({
          type: "info",
          action: "API - Shortening",
          description: `Added new short URL from ${short} to ${long}`
        });
      } catch (error) {
        analytics({
          type: "error",
          action: "API - Shortening",
          description: `Add new short URL failed: ${error.message}`
        });
        throw error;
      }

      return newContent;
    }
  };
};
