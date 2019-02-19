'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Author = require('./authors');
const commentSchema = require('./comments');
mongoose.Promise = global.Promise;

const blogPostSchema = mongoose.Schema({
  author: { type: Schema.Types.ObjectId, ref: 'author' },
  title: { type: String, required: true },
  content: { type: String },
  created: { type: Date, default: Date.now },
  comments: [commentSchema]
});

blogPostSchema.pre('find', function() {
  this.populate('author');
})

blogPostSchema.virtual('authorName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

blogPostSchema.methods.serialize = function() {
  return {
    id: this._id,
    author: this.authorName,
    content: this.content,
    title: this.title,
    created: this.created,
    comments: this.comments
  };
};

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = {BlogPost};
