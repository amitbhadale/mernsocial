const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({});

module.exports = mongoose.modelNames("User", userSchema);
