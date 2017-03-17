const mongoose = require('mongoose'),
      assert = require('assert'),
      User = require('../src/user'),
      Comment = require('../src/comment'),
      BlogPost = require('../src/blogPost')

describe('Associations', () => {
  let joe, blopost, comment

  beforeEach((done) => {
    joe = User({ name: 'Joe' })
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it reallt is' })
    comment = new Comment({ content: 'Congrats, a great post!' })

    joe.blogPosts.push(blogPost)
    blogPost.comments.push(comment)
    comment.user = joe

    // save in parallel, Promise.all heavily used when setting up associations

    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done())
  })

  // it.only or xit can be used to show only one test or prevent one
  it('saves a relation between a user and a blogpost', (done) => {

    // populate(modifier) grabs the associations

    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'Comment',
          populate: {
            path: 'user',
            model: 'User'
          }
        }
      })
      .then((user) => {
        assert(user.name === 'Joe')
        assert(user.blogPosts[0].title === 'JS is Great')
        assert(user.blogPosts[0].comments[0].content === 'Congrats, a great post!')
        assert(user.blogPosts[0].comments[0].user.name === 'Joe')
        done()
      })
  })
})
