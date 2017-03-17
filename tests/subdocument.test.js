const assert = require('assert'),
      User = require('../src/user')

describe('Subdocuments', () => {
  it('can create a subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [
        { title: 'My Post title' }
      ]
    })

    joe.save()
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        assert(user.posts[0].title === 'My Post title')
        done()
      })
  })

  it('can add subdocuments to an existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: []
    })

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts.push({ title: 'New Post' })
        return user.save()
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'New Post')
        done()
      })
  })

  it('can remove an existing subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'New Title' }]
    })

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        // removing a subdocument doesn't auto save!
        const post = user.posts[0]
        post.remove()
        return user.save()
      })
      .then((user) => {
        assert(user.posts.length === 0)
        done()
      })
  })
})
