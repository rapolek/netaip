const service = require('./service');

exports.handler = async (event, context) => {
  const posts = await service.getLoves();

  return {
    statusCode: 200,
    body: JSON.stringify(posts),
  };
};
