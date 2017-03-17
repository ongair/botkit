const Step = require('./step.js')
const Phrase = require('./phrase.js')

class EntryStep extends Step {
  constructor (keywords=[]) {
    const check = (input) => {
      let phrase = new Phrase('cta', keywords)
      return phrase.matches(input)
    }

    super(null, check)
  }
}

// class YesNoStep extends Step {
//   constructor()
// }

module.exports = {
  EntryStep: EntryStep
}
