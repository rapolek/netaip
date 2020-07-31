const mongoose = require('mongoose');

const DB_URL =
  'mongodb+srv://netaip:MIYPIsd9iXJ4bBxF@netaip.bqdjs.mongodb.net/netaip?retryWrites=true&w=majority';

const postsSchema = new mongoose.Schema({
  id: String,
  loves: Number,
});

let db, postsModel;

mongoose.connect(DB_URL).then((connection) => {
  db = connection;
  postsModel = db.model('posts', postsSchema);
});

module.exports = { db, postsModel };
