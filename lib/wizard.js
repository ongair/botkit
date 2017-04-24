const { isProd } = require('./env')
const send = require('./notify')
const Message = require('./message')

class Wizard {
  constructor(user=nil, steps) {
    this.user = user
    this.steps = steps
  }

  load(user) {
    this.user = user
  }

  progress(input) {
    return new Promise((resolve, reject) => {
      // find the step
      let step = this.steps.find(step => { return this.user.state == step.key })

      if (step) {
        // execute the onEnter for the step
        step.onEnter(this.user, input)
          .then((response) => {
            let { key, messages, metadata, restart } = response

            if (restart) {
              messages = [
                new Message(this.user, "No worries, to start again just reply with Twin Plus", ["Twin Plus"])
              ]
              this.user.clearMeta()
              this.user.state = 'new'

              if (isProd()) {
                this.user.save()
              }

              send(this.user, messages)
                .then(success => {
                  resolve({ key: 'new', user: this.user, messages: messages, metadata: null, restart: restart })
                })
            }
            else {
              // save and send these
              this.user.state = key

              // set metadata fields
              if (metadata) {
                metadata.forEach(meta => {
                  this.user.setMeta(meta.key, meta.value)
                })
              }

              if (isProd()) {
                this.user.save()
              }

              step.onExit(this.user, key)

              // only run this if there are messages
              if (messages && messages.length > 0)
                send(this.user, messages)
                  .then((success) => {
                    resolve({ key: key, user: this.user, messages: messages, metadata: metadata })
                  })
              else
                resolve({ key: key, user: this.user, messages: messages, metadata: metadata })
            }
          })
      }
      else
        reject('No step for state: ' + this.user.state)
    });

  }
}

module.exports = Wizard
