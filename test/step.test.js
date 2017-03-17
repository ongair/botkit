const Step = require('../lib/step.js')
const Phrase = require('../lib/phrase.js')
const chai = require('chai')
const { expect } = chai


describe('Steps have both entry and exit criteria', () => {


  it('A step has entry criteria which is function', () => {

    const entry = (input) => {
      let phrase = new Phrase('cta', ['TwinPlus', 'Learn'])
      return phrase.matches(input)
    }

    const exit = (input) => {
      let phrase = new Phrase('yes', ['Yes', 'Yeah', 'yup'])
      return phrase.matches(input)
    }

    const step = new Step(entry, exit)
    expect(step.enter('TwinPlus')).to.be.true
    expect(step.leave('yup')).to.be.true
  })
})
