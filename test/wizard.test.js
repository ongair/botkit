const Step = require('../lib/step.js')
const Wizard = require('../lib/wizard.js')
const Response = require('../lib/response.js')
const { EntryStep } = require('../lib/step_type.js')

const chai = require('chai')
const { expect } = chai


describe('A wizard is a series of steps that are progressed based on input', () => {
  it('Can start a wizard by evaluating the first step', () => {

    let steps = [
      new EntryStep('begin',['Begin', 'Start'])
    ]

    const basicWizard = new Wizard(steps)
    expect(basicWizard.begin('begin')).to.be.true
  })
})
