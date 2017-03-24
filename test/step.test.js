const Step = require('../lib/step.js')
const Message = require('../lib/message.js')

const chai = require('chai')
const { expect } = chai


describe('Steps', () => {

  let first = new Step('1', (user,input) => {
    return new Promise((resolve, reject) => {
      if (input == '2')
        resolve({ key: '2', messages: [ new Message(user, "Hi") ], metadata: [ { key: 'age', value: 20 }] })
      else
        resolve({ key: '1', messages: [ new Message(user, "Say what?")]})
    })
  })

  let user = { contactId: '1' }

  it('If a step is successful it returns the key of the next step', (done) => {

    first.onEnter(user, '2')
      .then(response => {
        let { key } = response

        expect(key).to.be.equal('2')
        done()
      })
  })

  it('If a step is unsuccessful it remains in the same step', (done) => {

    first.onEnter(user, 'wrong')
      .then(response => {
        let { key } = response

        expect(key).to.be.equal('1')
        done()
      })
  })
})
