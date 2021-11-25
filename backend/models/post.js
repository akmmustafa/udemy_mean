const mongoose = require('mongoose');

//defining Schema for mongodb data
const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true}
});

module.exports = mongoose.model('Post', postSchema);
