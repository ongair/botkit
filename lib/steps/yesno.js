const FuzzyStep = require('../fuzzy_step')

class YesNoStep extends FuzzyStep {

  constructor(key, postives=['Yes', 'Yeah'], negatives=['No', 'Nope']) {
    console.log('Key', key)
    super(key, postives, negatives)
  }

  yes(input) {
    return this.positive(input)
  }
}

module.exports = YesNoStep
