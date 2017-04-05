const fuzzy = require('fuzzy')
class Step {

  constructor(key, entry=null) {
    this.key = key
    this.entry = entry
  }

  enter(user, input) {
    console.log('In step', this.key, input, user.contactId)
  }

  onEnter(user, input) {
    return new Promise((resolve, reject) => {
      if (this.entry)
        this.entry(user, input)
          .then(result => {
            resolve(result)
          })
      else
        resolve({ key: null, user: user, messages: null, metadata: null })
    });
  }

  onExit(outKey) {
    console.log('Exiting', this.key, outKey)
  }

  isRestart(input) {
    const options = ["Restart", "Start over", "Start again"]
    return fuzzy.filter(input, options).length > 0
  }

  restart() {
    return { restart: true }
  }

  handleUnknown(input) {
    if (this.isRestart(input))
      return this.restart()
    else
      return { key: this.key, messages: this.tryAgain() }
  }

  tryAgain() {
    return []
  }
}

module.exports = Step
