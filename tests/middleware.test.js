const mongoose = require('mongoose'),
      assert = require('assert'),
      User = require('../src/user'),
      BlogPost = require('../src/blogPost')

describe('Middleware', () => {

  joe = User({ name: 'Joe' })

  beforeEach((done) => {
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it reallt is' })

    joe.blogPosts.push(blogPost)

    // save in parallel, Promise.all heavily used when setting up associations

    Promise.all([joe.save(), blogPost.save()])
      .then(() => done())
  })

  it('users clean up dangling blogposts on remove', (done) => {
    joe.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0)
        done()
      })
  })
})
