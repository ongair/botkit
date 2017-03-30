const Step = require('../step')
const Message = require('../message')

class FieldStep extends Step {

  constructor(key, nextStep, nextPrompt, nextOptions=[]) {
    super(key)
    this.nextStep = nextStep
    this.nextPrompt = nextPrompt
    this.nextOptions = nextOptions
  }

  onEnter(user, input) {
    return new Promise((resolve, reject) => {
      this.enter(user, input)
      let key=this.nextStep, messages=[], metadata=[]

      metadata.push({ key: this.key, value: input })
      messages.push(new Message(user, this.nextPrompt, this.nextOptions))

      resolve({ key: key, metadata: metadata, messages: messages })
    });
  }
}

module.exports = FieldStep
