const chai = require('chai')
const { expect } = chai
const Option = require('../lib/option')


describe('Menu options', () => {

  it('Can fuzzy match an option to return true', () => {

    let option = new Option('forex', ['Get Forex Rates', 'Forex', 'Currency'])

    expect(option.evaluate('Forex')).to.be.true
    expect(option.evaluate('Loan')).to.be.false
  })
})
