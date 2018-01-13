exports.graphqlConfig = ({ request, ...options }) => {
  if (process.env.NODE_ENV === "production") {
    const token = request.headers.authorization || "test-token";
    request.token = token;
    return {
      token,
      request,
      ...options
    };
  }
  return { request, ...options };
};
