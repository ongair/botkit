const email = require('email-validator')
const Step = require('../step')
const Message = require('../message')

class EmailStep extends Step {

  constructor(key, nextStep, correctText="Thanks. I’ll forward your details and someone will be in touch shortly. Have a great day!", wrongText="Sorry, please check that email address again", correctOptions=[]) {
    super(key)
    this.nextStep = nextStep
    this.correctText = correctText
    this.wrongText = wrongText
    this.correctOptions = correctOptions
  }

  onEnter(user, input) {
    this.enter(user, input)
    return new Promise((resolve, reject) => {
      let metadata, key, messages, restart

      let valid = email.validate(input)
      if (valid) {
        key = this.nextStep
        metadata = [{ key: 'email', value: input }]
        messages = [
          new Message(user, this.correctText, this.correctOptions)
        ]
      }
      else {
        let response = this.handleUnknown(input)
        key = response.key
        restart = response.restart
        messages = response.messages
      }

      resolve({ messages:messages, metadata: metadata, key: key, restart: restart })
    })
  }

  tryAgain() {
    return [
      new Message(null, this.wrongText)
    ]
  }
}

module.exports = EmailStep
