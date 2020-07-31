import db from './database';

class Service {
  postsModel = db.model('posts');

  async getLoves() {
    const posts = await this.postsModel.find().exec();

    return posts;
  }

  async addLove(id) {
    const post = await this.postsModel.findOne({ id });

    if (!post) {
      const freshPost = { id, loves: 1 };

      await this.postsModel.create(freshPost);

      return freshPost;
    }

    const newPost = { ...post, loves: post.loves + 1 },
    
    await this.postsModel.update({ id }, newPost);

    return newPost;
  }

  async removeLove(id) {
    const post = await this.postsModel.findOne({ id });

    if (!post) {
      return null;
    }

    const newPost = { ...post, loves: post.loves - 1 },
    
    await this.postsModel.update({ id }, newPost);

    return newPost;
  }
}

export default new Service();
