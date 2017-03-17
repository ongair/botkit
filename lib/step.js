class Step {
  constructor(entry=null,exit=null,prompts=[],responses=[]) {
    this.entry = entry
    this.exit = exit
  }

  enter(input) {
    return this.entry == null || this.entry(input)
  }

  leave(input) {
    return this.exit == null || this.exit(input)
  }
}

module.exports = Step
