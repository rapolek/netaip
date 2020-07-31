const mongoose = require('mongoose');

const DB_URL =
  'mongodb+srv://netaip:MIYPIsd9iXJ4bBxF@netaip.bqdjs.mongodb.net/netaip?retryWrites=true&w=majority';

const postsSchema = new mongoose.Schema({
  id: String,
  loves: Number,
});

const db = await mongoose.connect(DB_URL);

db.model('posts', postsSchema);

export default db;
