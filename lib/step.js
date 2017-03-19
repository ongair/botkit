class Step {
  constructor(key, entry=null,exit=null,prompt=null,response=null) {
    this.key = key
    this.entry = entry
    this.exit = exit
    this.response = response
    this.prompt = prompt
    this.wizard = null
  }

  enter(input) {
    return this.entry == null || this.entry(input)
  }

  setWizard(wizard) {
    this.wizard = wizard
  }

  getResponse(user) {
    return this.response.getMessages(user)
  }

  getPrompt() {
    return getRandom(this.prompt)
  }

  getRandom(array) {
    return array[Math.floor((Math.random()*array.length))]
  }

  leave(input) {
    return this.exit == null || this.exit(input)
  }
}

module.exports = Step
