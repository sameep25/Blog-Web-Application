import Post from "../schema/post.js";

export const createPost = async (req, res) => {
  try {
    const post = await new Post(req.body);
    post.save();
    return res.status(200).json({ msg: "Post saved successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error while saving post in db", error });
  }
};

export const getAllPosts = async (req, res) => {
  let category = req.query.category;
  let posts;
  try {
    if (category) {
      posts = await Post.find({ categories: category });
    } else {
      posts = await Post.find({});
    }
    return res.status(200).json(posts);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error while getting the data from db" });
  }
};

export const getPostById = async (req, res) => {
  try {
    let id = req.query.id;
    let post = await Post.findById(id);
    return res.status(200).json(post);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error while fetching single Post from db" });
  }
};

export const updatePostById = async (req, res) => {
  try {
    let id = req.body._id;
    const post = Post.findById(id);

    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }
    await Post.findByIdAndUpdate(id, { $set: req.body });
    return res.status(200).json({ msg: "post updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error while updating single Post from db" });
  }
};

export const deletePostById = async (req, res) => {
  try {
    let id = req.params.id;
    if (Post.findById(id)) {
      await Post.deleteOne({ _id: id });
      return res.status(200).json({ msg: "Post deleted successfully" });
    }
    return res.status(404).json({ msg: "Post not found" });
  } catch (error) {
    return res.status(500).json({ msg: "Error while deleting post from db" });
  }
};
