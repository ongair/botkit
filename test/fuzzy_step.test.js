const FuzzyStep = require('../lib/fuzzy_step.js')
const Message = require('../lib/message.js')

const chai = require('chai')
const { expect } = chai

class SampleFuzzyStep extends FuzzyStep {
  constructor() {
    super('yes-no', ['Yes', 'yeah', 'yup'], ['No', 'nope'])
  }

  onEnter(user, input) {
    return new Promise((resolve, reject) => {
      let positive = this.positive(input)
      let negative = this.negative(input)

      if (positive)
        resolve({ key: 'next' })
      else
        resolve({ key: 'end' })
    });
  }
}

describe('Fuzzy Steps', () => {

  it('Can check for yes and no', (done) => {

    let step = new SampleFuzzyStep()
    step.onEnter(null, 'yup')
      .then(response => {
        let { key } = response

        expect(key).to.be.equal('next')
        done()
      })
  })
})
