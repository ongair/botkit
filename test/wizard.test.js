const Step = require('../lib/step.js')
const Wizard = require('../lib/wizard.js')
const Response = require('../lib/response.js')
const { EntryStep } = require('../lib/step_type.js')

const chai = require('chai')
const { expect } = chai


describe('A wizard is a series of steps that are progressed based on input', () => {

  let entry = new EntryStep('begin',['Begin', 'Start'])
  let finish = new EntryStep('end', ['End'])
  let steps = [ entry, finish ]

  const basicWizard = new Wizard(steps)

  it('Can get a step by key', () => {
    let found = basicWizard.getStep('end')
    expect(found).to.eql(finish)
  })

  it('Can start a wizard by evaluating the first step', () => {
    expect(basicWizard.begin('begin')).to.be.true
  })
})
