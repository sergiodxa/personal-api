const auth = require("./lib/auth");

function private(fn) {
  return (_, args, context) => {
    if (process.env.NODE_ENV === "production") {
      if (context.request.token !== auth.token) {
        throw new Error("Not Authorized.");
      }
    }

    return fn(_, args, context);
  };
}

module.exports = private;
