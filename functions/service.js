async function getLoves(postsModel) {
  const posts = await postsModel.find().exec();

  return posts;
}

async function addLove(postsModel, id) {
  const post = await postsModel.findOne({ id });

  console.log(post);

  if (!post) {
    const freshPost = { id, loves: 1 };

    await postsModel.create(freshPost);

    return freshPost;
  }

  const newPost = await postsModel.findOneAndUpdate(
    { id },
    { loves: post.loves + 1 },
    { new: true },
  );

  return newPost;
}

async function removeLove(postsModel, id) {
  const post = await postsModel.findOne({ id });

  if (!post) {
    return null;
  }

  const newPost = await postsModel.findOneAndUpdate(
    { id },
    { loves: post.loves - 1 },
    { new: true },
  );

  return newPost;
}

module.exports = { getLoves, addLove, removeLove };
