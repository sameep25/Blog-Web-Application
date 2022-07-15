import Comment from "../schema/comment.js";

export const addNewComment = async (req, res) => {
  try {
    const comment = await new Comment(req.body);
    comment.save();

    return res.status(200).json({ msg: "Comment saved successfully added " });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCommentsById = async (req, res) => {
  try {
    let comments = await Comment.find({ postId: req.params.id });
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
