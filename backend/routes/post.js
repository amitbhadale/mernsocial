const express = require("express");
const {
  createPost,
  likeDislikePost,
  deletePost,
  getPostsofFollowing,
  updateCaption,
  addComment,
  deleteComment,
  updateComment,
} = require("../controllers/post");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPost);
router
  .route("/post/:id")
  .get(isAuthenticated, likeDislikePost)
  .put(isAuthenticated, updateCaption)
  .delete(isAuthenticated, deletePost);

router
  .route("/post/comment/:id")
  .post(isAuthenticated, addComment)
  .put(isAuthenticated, updateComment)
  .delete(isAuthenticated, deleteComment);

router.route("/posts").get(isAuthenticated, getPostsofFollowing);
module.exports = router;
