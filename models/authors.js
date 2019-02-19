const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorsSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: String
});

const Author = mongoose.model('author', authorsSchema);

module.exports = { Author };