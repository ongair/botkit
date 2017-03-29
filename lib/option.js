const fuzzy = require('fuzzy')

class Option {
  constructor(key, synonyms=[]) {
    this.key = key
    this.synonyms = synonyms
  }

  evaluate(input) {
    return fuzzy.filter(input,this.synonyms).length > 0
  }
}

module.exports = Option
