const Step = require('./step')

class MenuStep extends Step {
  constructor(key, options) {
    super(key)
    this.options = options
  }

  getAction(input) {
    let found = this.options.filter(option => {
      return option.evaluate(input)
    })

    if (found.length > 0)
      return found[0].key
    else
      return 'unknown'
  }
}

module.exports = MenuStep
