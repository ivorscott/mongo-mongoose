const mongoose = require('mongoose'),
      { Schema } = mongoose

const PostSchema = new Schema({
  title: String
})

// no mongoose model because this is not going to map to a
// distinct model inside the database

module.exports = PostSchema
