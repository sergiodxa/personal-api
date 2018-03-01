const { isEmail } = require("validator");

module.exports = async ({ mailchimp, MAILCHIMP_LIST_ID, analytics }) => {
  return {
    async subscribe(email) {
      if (!isEmail(email)) {
        throw new Error("The email address is invalid.");
      }

      const response = await mailchimp(`/lists/${MAILCHIMP_LIST_ID}/members`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          email_address: email,
          status: "subscribed"
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const { title, status, detail } = await response.json();

      if (status > 299) {
        switch (title) {
          case "Member Exists": {
            return "You're already subscribed 😉.";
          }
          default: {
            analytics({
              type: "error",
              action: "API - Subscription",
              description: `User subscription failed: ${title}: ${detail}`
            });
            throw new Error(`${title}: ${detail}`);
          }
        }
      }

      analytics({
        type: "info",
        action: "API - Subscription",
        description: `User ${email} subscribed`
      });

      return "You were successfully subscribed.";
    }
  };
};
