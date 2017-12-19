exports.graphqlConfig = ({ request, ...options }) => {
  const token = request.headers.authorization || 'test-token';
  request.token = token;
  return {
    token,
    request,
    ...options
  }
}
