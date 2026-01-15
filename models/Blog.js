const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  prompt: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Blog", blogSchema);
