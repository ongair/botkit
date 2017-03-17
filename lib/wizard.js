class Wizard {
  constructor(steps=[],index=0) {
    this.steps = steps
    this.index = 0
  }

  begin(input) {
    let entry = this.steps[0]

    return entry.exit(input)
  }
}

module.exports = Wizard
