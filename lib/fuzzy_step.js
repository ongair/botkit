const Step = require('./step')
const fuzzy = require('fuzzy')
class FuzzyStep extends Step {

  constructor(key, positives=[], negatives=[]) {
    super(key)
    this.positives = positives
    this.negatives = negatives
  }

  positive(input) {
    return fuzzy.filter(input, this.positives).length > 0
  }

  negative(input) {
    return fuzzy.filter(input, this.negatives).length > 0
  }
}

module.exports = FuzzyStep
