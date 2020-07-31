const service = require('./service');
const connectDb = require('./database');

let db;

exports.handler = async (event, context) => {
  if (!db) {
    db = await connectDb();
  }

  const posts = await service.getLoves(db.postsModel);

  return {
    statusCode: 200,
    body: JSON.stringify(posts),
  };
};
