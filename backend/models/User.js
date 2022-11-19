const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter a name"],
  },
  avatar: {
    public_id: String,
    url: String,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minlength: [6, "Password must be atleast 6 characters"],
    select: false,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
userSchema.methods.matchPasssword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateToken = async function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};
module.exports = mongoose.model("User", userSchema);
