// const Step = require('../lib/step.js')
// const Wizard = require('../lib/wizard.js')
// const Response = require('../lib/response.js')
// const { EntryStep } = require('../lib/step_type.js')
//
// const chai = require('chai')
// const { expect } = chai
//
//
// describe('A wizard is a series of steps that are progressed based on input', () => {
//
//   let entry = new EntryStep('begin',['Begin', 'Start'])
//   let finish = new EntryStep('end', ['End'])
//   let steps = [ entry, finish ]
//
//   const basicWizard = new Wizard(steps)
//
//   it('Can get a step by key', () => {
//     let found = basicWizard.getStep('end')
//     expect(found).to.eql(finish)
//   })
//
//   it('Can start a wizard by evaluating the first step', () => {
//     expect(basicWizard.begin('begin')).to.be.true
//   })
// })

const Wizard = require('../lib/wizard')
// const ProductWizard = require('../../app/product')
// const { Step, Message } = require('../../app/step')
const Step = require('../lib/step')
const Message = require('../lib/step')
const chai = require('chai')
const { expect } = chai

describe('The wizard base class', () => {

  describe('Progression', () => {

    let user = { state: 'unknown', name: 'Trevor', contactId: 'Me', setMeta: (key, value) => { } }

    let wizard = new Wizard(user,
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

  })
})
