const Wizard = require('../lib/wizard')
const Step = require('../lib/step')
const Message = require('../lib/step')
const chai = require('chai')
const { expect } = chai

describe('The wizard base class', () => {

  describe('Progression', () => {

    let user = { state: 'unknown', name: 'Trevor', contactId: 'Me', setMeta: (key, value) => { } }

    let wizard = new Wizard(null,
      [
        new Step('1', (user,input) => {
          return new Promise((resolve, reject) => {
            resolve({ key: '2', messages: [ new Message(user, "Hi") ], metadata: [ { key: 'age', value: 20 }] })
          })
        }),
        new Step('2', (user,input) => {
          return new Promise((resolve, reject) => {
            resolve({ key: 'end', messages: [ new Message(user, "Bye") ]})
          })
        })
      ])

    wizard.load(user)

    it('Handles an invalid state', (done) => {
      wizard.progress('Wassup')
        .catch(err => {
          expect(err).to.equal('No step for state: unknown')
          done()
        })
    })

    it('Progresses to the next state if successful', (done) => {
      user.state = '1'

      wizard.progress('Correct')
        .then(response => {
          let { key, messages, user } = response

          expect(key).to.eql('2')
          expect(user.state).to.eql('2')

          done()
        })
    })

    it('Saves metadata from the result of progress', (done) => {
      user.state = '1'
      wizard.progress('Correct')
        .then(response => {
          let { metadata } = response
          let expected = [{ key: 'age', value: 20 }]

          expect(metadata).to.eql(expected)
          done()
        })
    })

    it('Executes the onExit after completing the step progression', (done) => {

      let exited = false
      class CanExit extends Step {

        constructor() {
          super('exit')
        }

        onEnter(user, input) {
          return new Promise((resolve, reject) => {
            resolve({ key: 'next' })
          })
        }

        onExit(user, key) {
          if (key == 'next')
            exited = true
        }
      }
      user.state = 'exit'
      wizard = new Wizard(user, [ new CanExit()])
      // wizard.onEnter()
      wizard.progress('Correct')
        .then(response => {

          expect(exited).to.be.true
          done()
        })
    })
  })
})
