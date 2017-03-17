const assert = require('assert'),
      User = require('../src/user')

describe('Reading users out of the database',() => {
  let joe, maria, alex, zach

  beforeEach((done) => {
    alex = new User({ name: 'Alex' })
    joe = new User({ name: 'Joe' })
    maria = new User({ name: 'Maria' })
    zach = new User({ name: 'Zach' })

    Promise.all([joe.save(), alex.save(), maria.save(), zach.save()])
      .then(() => done())
  })

  it('find all users with a name of joe', (done) => {
    User.find({
      name: 'Joe'
    })
    .then((users) => {
      assert(users[0]._id.toString() === joe._id.toString())
      done();
    })
    .catch((e) => done(e))
  })

  it('find a user with a particular id', (done) => {
    User.findOne({
      _id: joe._id
    })
    .then((user) => {
      assert(user.name === 'Joe')
      done()
    })
    .catch((e) => done(e))
  })

  it('can skip and limit', () => {
    // find all but skip 1
    // -Alex- [Joe, Maria, Zach]
    User.find({})
      .sort({ name: 1 }) // (1) ascending, (-1) descending
      .skip(1)
      .limit(2)
      .then(() => {
        assert(users.length === 2)
        assert(users[0].name === 'Joe')
        assert(users[1].name === 'Maria')
        done()
      })
  })
})
