const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({});

module.exports = mongoose.modelNames("Post", postSchema);
