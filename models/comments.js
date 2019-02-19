const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  text: String
});

module.exports = commentSchema;
