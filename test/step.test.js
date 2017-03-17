const Step = require('../lib/step.js')
const Response = require('../lib/response.js')
const { EntryStep } = require('../lib/step_type.js')
const Phrase = require('../lib/phrase.js')
const chai = require('chai')
const { expect } = chai


describe('Steps have both entry and exit criteria', () => {

  it('can enter any step that has no input criteria', () => {
    const step = new Step('begin',null, null)

    expect(step.enter('anything')).to.be.true
    expect(step.leave(null)).to.be.true
  })

  it('A step has entry criteria which is function', () => {

    const entry = (input) => {
      let phrase = new Phrase('cta', ['TwinPlus', 'Learn'])
      return phrase.matches(input)
    }

    const exit = (input) => {
      let phrase = new Phrase('yes', ['Yes', 'Yeah', 'yup'])
      return phrase.matches(input)
    }

    const step = new Step('1',entry, exit)
    expect(step.enter('TwinPlus')).to.be.true
    expect(step.leave('yup')).to.be.true
  })

  describe('Pre-defined steps', () => {

    it('Can handle an entry step which has a set of keywords',() => {    
      let entry = new EntryStep('start',['KeyWord'])
      expect(entry.enter('anything')).to.be.true
    })

    it('Can get user responses', () => {

      let entry = new EntryStep('start', ['KeyWord'], new Response(['Hi']))
      let messages = entry.getResponse({ name: 'me' })

      expect(messages.length).to.eql(1)
    })
  })
})
