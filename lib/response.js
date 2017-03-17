class Response {
  constructor(messages=[], options=null) {
    this.messages = messages
    this.options = options
  }

  getMessages(user) {
    return this.messages.map((item, index) => {
      return {
        text: personalize(item, user.name),
        options: index == (this.options && this.options.length - 1) ? this.options : null
      }
    })
  }
}

function personalize(text, name) {
  return text.replace(new RegExp('{{user}}','g'), name)
}

module.exports = Response
