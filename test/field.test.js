const Message = require('../lib/message')
const FieldStep = require('../lib/steps/field')
const chai = require('chai')
const { expect } = chai

describe('The sign up step', () => {

  let user = { name: 'Alex', contactId: '2' }
  let step = new FieldStep('name','name','end',"Thanks", ["Yes", "No"])

  it('Can save a name', (done) => {

    step.onEnter(user, 'Jack Daniels')
      .then(response => {
        let { key, metadata, messages } = response
        let meta = [{ key: 'name', value: 'Jack Daniels' }]
        let expected = [ new Message(user, "Thanks", ["Yes", "No"]) ]

        expect(key).to.be.equal('end')
        expect(metadata).to.be.eql(meta)
        expect(messages).to.be.eql(expected)

        done()
      })
  })
})
