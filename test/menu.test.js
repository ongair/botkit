const chai = require('chai')
const { expect } = chai
const Option = require('../lib/option')
const Menu = require('../lib/menu')


describe('Menu steps', () => {

  it('Can fuzzy match an option to return true', () => {

    let forex = new Option('forex', ['Get Forex Rates', 'Forex', 'Currency'])
    let loan = new Option('loan', ['Loan Calculator', 'Loan', 'Calculator'])

    let menu = new Menu('menu', [ forex, loan ])

    expect(menu.getAction('Get Forex Rates')).to.be.eql('forex')
    expect(menu.getAction('Talk to support')).to.be.eql('unknown')
  })
})
