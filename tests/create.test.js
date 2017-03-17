const assert = require('assert'),
      User = require('../src/user')

describe('Creating record', () => {
  it('saves a user', (done) => {
    let joe = new User({ name: 'Joe'})

    joe.save()
      .then(() => {
        // Has joe been saved successfully?
        assert(!joe.isNew)
        done()
      }).catch((e) => done(e))
  })
})
