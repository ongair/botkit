const Step = require('./step.js')
const Phrase = require('./phrase.js')

class EntryStep extends Step {
  constructor (key, keywords, response) {
    const check = (input) => {
      let phrase = new Phrase('cta', keywords)
      return phrase.matches(input)
    }


    super(key, null, check, null, response)
  }
}

// class YesNoStep extends Step {
//   constructor()
// }

module.exports = {
  EntryStep: EntryStep
}
