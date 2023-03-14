const User = require("../models/User");
const Post = require("../models/Post");
const cloudinary = require("cloudinary");

exports.register = async (req, res) => {
  try {
    const { name, email, password, avtr } = req.body;
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    const myCloud = await cloudinary.uploader.upload(avtr, {
      folder: "avatars",
    });

    user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
    });

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 1000),
      httpOnly: true,
    };

    res
      .status(201)
      .cookie("token", token, options)
      .json({ success: true, user });
  } catch (e) {
    res.status(500).json({
      success: false,
      messsage: e.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email })
      .select("+password")
      .populate("posts followers following");

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User does not found" });

    const isMatch = await user.matchPasssword(password);

    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Password does not match" });

    const token = await user.generateToken();

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 1000),
      httpOnly: true,
    };

    res
      .status(200)
      .cookie("token", token, options)
      .json({ success: true, user });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.getLoginUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "posts followers following"
    );

    res.status(200).json({
      success: true,
      user,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.logOut = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({ success: true, message: "Logged out" });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.followUnfollowUSer = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const loggedUser = await User.findById(req.user._id);

    if (!userToFollow)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (userToFollow.followers.includes(loggedUser._id)) {
      const indexFollower = userToFollow.followers.indexOf(loggedUser._id);
      const indexFollowing = loggedUser.following.indexOf(userToFollow._id);

      userToFollow.followers.splice(indexFollower, 1);
      loggedUser.following.splice(indexFollowing, 1);

      await userToFollow.save();
      await loggedUser.save();

      res.status(200).json({
        success: true,
        message: "User unfollowed",
      });
    } else {
      loggedUser.following.push(userToFollow._id);
      userToFollow.followers.push(loggedUser._id);

      await userToFollow.save();
      await loggedUser.save();

      res.status(200).json({ success: true, message: "User followed" });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword)
      return res.status(400).json({
        success: false,
        message: "Old password and new password not found",
      });

    const isMatch = await user.matchPasssword(oldPassword);

    if (!isMatch)
      return res
        .status(404)
        .json({ success: false, message: "Old password not matched" });

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { name, email, avtr } = req.body;

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }

    if (avtr) {
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);

      const myCloud = await cloudinary.v2.uploader.upload(avtr, {
        folder: "avatars",
      });

      user.avatar.public_id = myCloud.public_id;
      user.avatar.url = myCloud.secure_url;
    }

    await user.save();
    res.status(200).json({
      success: true,
      message: "User updated",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      name: { $regex: req.query.name, $options: "i" },
    });
    res.status(200).json({
      success: true,
      users,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const page = req.query.page;
    const itemsToShow = 5;
    const skip = itemsToShow * (page - 1);
    console.log("page", page);
    // const skip =
    const myposs = await Post.find({
      owner: req.user._id,
    })
      .sort({ _id: -1 })
      .limit(itemsToShow)
      .skip(skip)
      .populate("owner likes comments.user");
    res.status(200).json({
      success: true,
      posts: myposs,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = user.posts;
    const followers = user.followers;
    const following = user.following;
    const id = user._id;

    //removing avatar from cloudinary
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
    //TODO
    console.log("posts", posts);

    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(posts[i]);
      await cloudinary.v2.uploader.destroy(post.image.public_id);
      await post.remove();
    }

    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    await user.remove();

    res.status(200).json({
      success: true,
      message: "Profile Deleted",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      owner: req.params.id,
    })
      .sort({ _id: -1 })
      .populate("owner likes comments.user");

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

exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "followers following"
    );
    res.status(200).json({
      success: true,
      user,
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
