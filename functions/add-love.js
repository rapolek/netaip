const service = require('./service');
const connectDb = require('./database');

let db;

exports.handler = async (event, context) => {
  if (!db) {
    db = await connectDb();
  }

  const id = event.queryStringParameters.id;

  if (!id) {
    return { statusCode: 400 };
  }

  const post = await service.addLove(db.postsModel, id);

  return {
    statusCode: 200,
    body: JSON.stringify(post),
  };
};
