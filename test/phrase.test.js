const chai = require('chai')
const { expect } = chai
const Phrase = require('../lib/phrase')

describe('It can parse requests', () => {
  it('Can match a phrase regardless of case', () => {

    let entry = new Phrase('start', ['Begin', 'Start'])

    expect(entry.matches('Forget')).to.be.false
    expect(entry.matches('start')).to.be.true

  })
})
