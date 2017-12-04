exports.graphqlConfig = ({ request, ...options }) => {
  const token = request.headers.authorization || 'test-token';
  request.token = token;
  return {
    token,
    request,
    ...options
  }
}

exports.graphiqlConfig = ({ request, ...options }) => {
  const token = process.env.API_TOKEN || 'test-token';
  return {
    ...options,
    passHeader: `Authorization: ${token}`
  }
}
