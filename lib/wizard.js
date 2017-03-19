class Wizard {
  constructor(steps=[],index=0) {
    this.steps = steps
    // this.steps.each(step => { step.setWizard(this) })
    this.index = 0
  }

  begin(input) {
    let entry = this.steps[0]

    return entry.exit(input)
  }

  getStep(key) {
    return this.steps.find((step) => { return step.key == key })
  }
}

module.exports = Wizard
