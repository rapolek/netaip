const data = require('./database');

async function getLoves() {
  const posts = await data.postsModel.find().exec();

  return posts;
}

async function addLove(id) {
  const post = await data.postsModel.findOne({ id });

  if (!post) {
    const freshPost = { id, loves: 1 };

    await data.postsModel.create(freshPost);

    return freshPost;
  }

  const newPost = { ...post, loves: post.loves + 1 };

  await data.postsModel.update({ id }, newPost);

  return newPost;
}

async function removeLove(id) {
  const post = await data.postsModel.findOne({ id });

  if (!post) {
    return null;
  }

  const newPost = { ...post, loves: post.loves - 1 };

  await data.postsModel.update({ id }, newPost);

  return newPost;
}

module.exports = { getLoves, addLove, removeLove };
