const express = require("express");
const {
  register,
  login,
  followUnfollowUSer,
  logOut,
  updatePassword,
  updateProfile,
} = require("../controllers/user");

const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logOut);
router.route("/follow/:id").get(isAuthenticated, followUnfollowUSer);
router.route("/update/password").put(isAuthenticated, updatePassword);
router.route("/update/profile").put(isAuthenticated, updateProfile);
// router.route("").post(isAuthenticated)
module.exports = router;
