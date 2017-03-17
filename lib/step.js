class Step {
  constructor(entry=null,exit=null,prompts=[],responses=[]) {
    this.entry = entry
    this.exit = exit
    this.responses = responses
    this.prompts = prompts
  }

  enter(input) {
    return this.entry == null || this.entry(input)
  }

  getResponse() {
    return getRandom(this.responses)
  }

  getPrompts() {
    return getRandom(this.prompts)
  }

  getRandom(array) {
    return array[Math.floor((Math.random()*array.length))]
  }

  leave(input) {
    return this.exit == null || this.exit(input)
  }
}

module.exports = Step
