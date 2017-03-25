const Step = require('../step')
const Message = require('../message')
const phone = require('phone')

class PhoneStep extends Step {

  constructor(key, nextStep, correctText, wrongText="Sorry, I didn't get that number.") {
    super(key)
    this.nextStep = nextStep
    this.correctText = correctText
    this.wrongText = wrongText
  }

  onEnter(user, input) {
    this.enter(user, input)
    return new Promise((resolve, reject) => {
      let metadata, key, messages, restart
      let valid = phone(input)
      if (valid.length > 0) {
        key = this.nextStep
        metadata = [{ key: 'phone_number', value: valid[0] }]
        messages = [
          new Message(user, this.correctText)
        ]
      }
      else {
        key = this.key
        let response = this.handleUnknown(input)
        messages = response.messages
        restart = response.restart
      }

      resolve({ messages:messages, metadata: metadata, key: key, restart: restart })
    });
  }

  tryAgain() {
    return [
      new Message(null, this.wrongText)
    ]
  }
}

module.exports = PhoneStep

// const botkit = require('ongair-botkit')
// const { Step, Message } = botkit
// const phone = require('phone')
//
// class SignUpStep extends Step {
//   constructor() {
//     super('signup')
//   }
//
//   onEnter(user, input) {
//     this.enter(user, input)
//     return new Promise((resolve, reject) => {
//       let metadata, key, messages, restart
//       let valid = phone(input)
//       if (valid.length > 0) {
//         key = 'email'
//         metadata = [{ key: 'phone_number', value: valid[0] }]
//         messages = [
//           new Message(user, "No pressure, but may I please have your email address as well?")
//         ]
//       }
//       else {
//         key = 'signup'
//         let response = this.handleUnknown(input)
//         messages = response.messages
//         restart = response.restart
//       }
//
//       resolve({ messages:messages, metadata: metadata, key: key, restart: restart })
//     });
//   }
//
//   tryAgain() {
//     return [
//       new Message(null, "Sorry, I didn't get that number. Please include the country code e.g +254 722 130 120")
//     ]
//   }
// }
//
// module.exports = SignUpStep
