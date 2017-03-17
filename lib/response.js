class Response {
  constructor(alternates=[], options=null) {
    this.alternates = alternates
    this.options = options
  }

  getRandom(user) {
    return {
      text: personalize(this.alternates[Math.floor((Math.random()*this.alternates.length))], user.name),
      options: this.options
    }
  }
}

function personalize(text, name) {
  return text.replace(new RegExp('{{user}}','g'), name)
}

module.exports = Response
