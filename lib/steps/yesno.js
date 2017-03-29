const FuzzyStep = require('../step')

class YesNoStep extends FuzzyStep {

  constructor(key, postives=['Yes', 'Yeah'], negatives=['No', 'Nope']) {
    super(key, postives, negatives)
  }
}

module.exports = YesNoStep
