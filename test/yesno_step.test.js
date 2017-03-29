const YesNoStep = require('../lib/steps/yesno')
const chai = require('chai')
const { expect } = chai

describe('The yes no step', () => {

  let user = { name: 'Alex', contactId: '2' }
  let step = new YesNoStep('phone')

  it('Can detect a yes', () => {

    expect(step.yes('Yes')).to.be.true
    expect(step.yes('No')).to.be.false
  })
})
