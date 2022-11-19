const Post = require("../models/Post");
const User = require("../models/User");
exports.createPost = async (req, res) => {
  try {
    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id: "req.body.Public_id",
        url: "req.body.url",
      },
      owner: req.user._id,
    };
    const newPost = await Post.create(newPostData);

    const user = await User.findById(req.user._id);

    user.posts.push(newPost._id);
    await user.save();
    res.status(201).json({
      success: true,
      post: newPost,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.likeDislikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);
      post.likes.splice(index, 1);
      await post.save();
      res.status(200).json({ success: true, message: "Post unliked" });
    } else {
      post.likes.push(req.user._id);
      await post.save();
      res.status(200).json({ success: true, message: "Post liked" });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    if (post.owner.toString() !== req.user._id.toString()) {
      res.status(404).json({ success: false, message: "Unauthorised" });
    }
    await post.remove();
    const user = await User.findById(req.user._id);
    const index = user.posts.indexOf(req.params.id);
    user.posts.splice(index, 1);
    await user.save();

    res.status(200).json({ success: true, message: "Post deleted" });

    // console.log("Post owner is", post.owner.toString(), req.user.id);
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.getPostsofFollowing = async (req, res) => {
  try {
    const loggednUSer = await User.findById(req.user._id);

    const posts = await Post.find({
      owner: { $in: loggednUSer.following },
    });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.updateCaption = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(400).json({
        success: false,
        message: "Post not found",
      });

    if (post.owner.toString() !== req.user.id.toString())
      return res.status(400).json({ success: false, message: "Unauthorised" });

    post.caption = req.body.caption;
    await post.save();
    return res.status(200).json({ success: true, message: "Caption updated" });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    const comment = {
      user: req.user.id,
      comment: req.body.comment,
    };

    post.comments.push(comment);
    await post.save();

    res.status(200).json({
      success: true,
      message: "comment Added",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    const commentId = req.body.commentId;

    if (!commentId)
      return res
        .status(404)
        .json({ success: false, message: "commentId not found" });

    const index = post.comments.map((i) => i._id.toString()).indexOf(commentId);
    if (index === -1)
      return res
        .status(404)
        .json({ success: false, message: "comment dont exists, not found" });

    if (req.user.id.toString() !== post.comments[index].user.toString())
      return res.status(404).json({ success: false, message: "Usnauthorised" });

    post.comments.splice(index, 1);
    await post.save();

    res.status(200).json({
      success: true,
      message: "Comment Deleted",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    const commentId = req.body.commentId;
    const commentText = req.body.commentText;

    if (!commentId || !commentText)
      return res.status(404).json({
        success: false,
        message: "commentId or comment text not found",
      });
    const index = post.comments.map((i) => i._id.toString()).indexOf(commentId);
    if (index === -1)
      return res
        .status(404)
        .json({ success: false, message: "comment dont exists, not found" });

    if (req.user.id.toString() !== post.comments[index].user.toString())
      return res.status(404).json({ success: false, message: "Usnauthorised" });

    post.comments[index].comment = commentText;
    await post.save();

    res.status(200).json({
      success: true,
      message: "Comment Updated",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

// exports.updateProfile = async (req, res) => {
//   try {
//   } catch (e) {
//     res.status(500).json({
//       success: false,
//       message: e.message,
//     });
//   }
// };