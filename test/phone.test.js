// const botkit = require('ongair-botkit')
const Message = require('../lib/message')
const PhoneStep = require('../lib/steps/phone')
const chai = require('chai')
const { expect } = chai

describe('The sign up step', () => {

  let user = { name: 'Alex', contactId: '2' }
  let step = new PhoneStep('phone','email', "What is your name?")

  it('Can send a correct phone number', (done) => {

    step.onEnter(user, '+254 705 123456')
      .then(response => {
        let { key, messages, metadata } = response

        expect(key).to.be.equal('email')
        expect(metadata).to.be.eql([{ key: 'phone_number', value: '+254705123456'}])
        expect(messages.length).to.be.equal(1)

        done()
      })
  })

  it('Can send an incorrect phone number', (done) => {

    step.onEnter(user, '+254 0705 866 564')
      .then(response => {
        let { key, messages, metadata } = response

        expect(key).to.be.equal('phone')
        expect(messages).to.be.eql([new Message(user, "Sorry, I didn't get that number.")])

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
