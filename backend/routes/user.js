const express = require("express");
const {
  register,
  login,
  followUnfollowUSer,
  logOut,
  updatePassword,
  updateProfile,
  getLoginUser,
  getAllUsers,
  getMyPosts,
  deleteProfile,
  getUserPosts,
  getUserInfo,
} = require("../controllers/user");

const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logOut);
router.route("/follow/:id").get(isAuthenticated, followUnfollowUSer);
router.route("/update/password").put(isAuthenticated, updatePassword);
router.route("/update/profile").put(isAuthenticated, updateProfile);
router.route("/delete/profile").delete(isAuthenticated, deleteProfile);
router.route("/me").get(isAuthenticated, getLoginUser);
router.route("/users").get(isAuthenticated, getAllUsers);
router.route("/myposts").get(isAuthenticated, getMyPosts);
router.route("/user/posts/:id").get(isAuthenticated, getUserPosts);
router.route("/user/:id").get(isAuthenticated, getUserInfo);
// router.route("").post(isAuthenticated)
module.exports = router;
