const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: "sample_id", url: "sample" },
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
    let user = await User.findOne({ email }).select("+password");

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
    const user = await User.findById(req.user._id).populate("posts");

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
        .json({ success: false, message: "USer not found" });

    if (userToFollow.followers.includes(loggedUser._id)) {
      const indexFollower = userToFollow.followers.indexOf(loggedUser._id);
      const indexFollowing = loggedUser.following.indexOf(userToFollow._id);

      userToFollow.followers.splice(indexFollower, 1);
      loggedUser.following.splice(indexFollowing, 1);

      await userToFollow.save();
      await loggedUser.save();

      res.status(200).json({
        success: true,
        message: "USer unfollowed",
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
        message: "Old pass word and new password not found",
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
    const { name, email } = req.body;

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
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
    const users = await User.find();
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

// exports.updateProfile = async (req, res) => {
//   try {
//   } catch (e) {
//     res.status(500).json({
//       success: false,
//       message: e.message,
//     });
//   }
// };
