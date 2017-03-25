const Message = require('../lib/message')
const EmailStep = require('../lib/steps/email')
const chai = require('chai')
const { expect } = chai

describe('The sign up step', () => {

  let user = { name: 'Alex', contactId: '2' }
  let step = new EmailStep('email','end','Thanks. I’ll forward your details and someone will be in touch shortly. Have a great day!')

  it('Can send a email', (done) => {

    step.onEnter(user, 'sendmespam@gmail.com')
      .then(response => {
        let { key, messages, metadata } = response

        expect(key).to.be.equal('end')
        expect(metadata).to.be.eql([{ key: 'email', value: 'sendmespam@gmail.com'}])
        expect(messages[0].text).to.be.equal("Thanks. I’ll forward your details and someone will be in touch shortly. Have a great day!")

        done()
      })
  })

  it('Can send an incorrect email', (done) => {

    step.onEnter(user, 'me@you')
      .then(response => {
        let { key, messages, metadata } = response

        expect(key).to.be.equal('email')
        expect(messages).to.be.eql([new Message(user, "Sorry, please check that email address again")])

        done()
      })
  })

  it('Can restart', (done) => {
    step.onEnter(user, 'Start over')
      .then(response => {
        let { restart } = response

        expect(restart).to.be.true
        done()
      })
  })
})
