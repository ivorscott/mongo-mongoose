const assert = require('assert'),
      User = require('../src/user')

describe('Update users in the database', () => {
  let joe

  beforeEach((done) => {
    joe = new User({name: 'Joe', likes: 0})
    joe.save()
      .then(() => done())
  })

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((user) => {
        assert(user.length === 1)
        assert(user[0].name === 'Alex')
        done()
      })
      .catch((e) => done(e))
  }

  it('instance type using set and save', (done) => {
    joe.set('name', 'Alex')
    assertName(joe.save(), done)
  })

  it('A model instance can update', (done) => {
    assertName(joe.update({ name: 'Alex'}), done)
  })

  it('A model class can update one record', (done) => {
    assertName(User.findOneAndUpdate({ name: 'Joe'}, {name: 'Alex'}), done)
  })

  it('A model class can find a record with an Id and update', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, {name: 'Alex'}), done)
  })

  it('A user can have their postcount incremented by 1', (done) => {
    User.update({name: 'Joe'}, {$inc: { likes: 10}})
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        assert(user.likes === 10)
        done()
      })
      .catch((e) => done(e))
  })
})
