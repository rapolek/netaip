const mongoose = require('mongoose');

const DB_URL =
  'mongodb+srv://netaip:MIYPIsd9iXJ4bBxF@netaip.bqdjs.mongodb.net/netaip?retryWrites=true&w=majority';

const postsSchema = new mongoose.Schema({
  id: String,
  loves: Number,
});

async function connectDb() {
  const db = await mongoose.connect(DB_URL);
  const postsModel = db.model('posts', postsSchema);

  return { db, postsModel };
}

module.exports = connectDb;
