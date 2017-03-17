class Step {
  constructor(key, entry=null,exit=null,prompt=null,response=null) {
    this.key = key
    this.entry = entry
    this.exit = exit
    this.response = response
    this.prompt = prompt
  }

  enter(input) {
    return this.entry == null || this.entry(input)
  }

  getResponse(user) {
    // return getRandom(this.responses)
    return this.response.getRandom(user)
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
