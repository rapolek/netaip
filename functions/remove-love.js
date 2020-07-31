const service = require('./service');

exports.handler = async (event, context) => {
  const id = event.query.id;

  if (!id) {
    return { statusCode: 400 };
  }

  const post = await service.removeLove(id);

  return {
    statusCode: 200,
    body: JSON.stringify(post),
  };
};
