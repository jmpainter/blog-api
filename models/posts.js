'use strict';

const mongoose = require('mongoose');
const commentSchema = require('./comments');
const Author = require('./authors');

mongoose.Promise = global.Promise;
const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'author'
  },
  content: String,
  created: {
    type: Date,
    default: Date.now()
  },
  comments: [commentSchema]
});

postSchema.pre('find', function() {
  this.populate('author');
});

postSchema.virtual('authorName').get(function() {
  return this.author.firstName + ' ' + this.author.lastName;
});

postSchema.methods.serialize = function() {
  return {
    id: this.id,
    title: this.title,
    author: this.authorName,
    created: this.created,
    content: this.content,
    comments: this.comments
  };
};

const BlogPost = mongoose.model('blogpost', postSchema);

module.exports = { BlogPost };
