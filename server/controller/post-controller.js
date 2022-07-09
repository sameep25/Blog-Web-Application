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
