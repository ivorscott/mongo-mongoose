const mongoose = require('mongoose'),
      { Schema } = mongoose,
      PostSchema = require('./post.schema')

mongoose.Promise = global.Promise

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{ type: Schema.Types.ObjectId, ref: "BlogPost" }]
})

UserSchema.virtual('postCount').get(function() {
  return this.posts.length
})

UserSchema.pre('remove', function(next) {
  const BlogPost = mongoose.model('BlogPost')
  BlogPost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next())
})

const User = mongoose.model('User', UserSchema)

// PostSchema is an embedded document or (sub document)

module.exports = mongoose.model('User', UserSchema)
