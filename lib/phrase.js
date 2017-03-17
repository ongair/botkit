const fuzzy = require('fuzzy')
function Phrase(title='', synonyms=[]) {
  this.title = title
  this.synonyms = synonyms
}

// Check if an input matches a specific phrase
Phrase.prototype.matches = function(input) {
  let results = fuzzy.filter(input, this.synonyms)
  return results.length > 0
}

module.exports = Phrase
