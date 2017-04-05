const chai = require('chai')
const { expect } = chai

const Message = require('../lib/message')

describe('Outgoing messages', () => {
  let user = { name: 'Alex Jones' }

  it('Can personalize a text with only the first name', () => {

    let message = new Message(user, "Hi {{first_name}}")
    expect(message.text).to.equal("Hi Alex")
  })

  it('Can personalize a text with the full name', () => {
    let message = new Message(user, "Hi {{name}}")
    expect(message.text).to.equal("Hi Alex Jones")
  })

  it('Can handle names from Telegram', () => {
    let user = { name: 'Trevor(@ongair)', accountType: 'Telegram'}
    let message = new Message(user, "Hi {{first_name}}")
    expect(message.text).to.equal("Hi Trevor")
  })

  it("Can handle a null user", () => {
    let msg = new Message(null, "Hi {{first_name}}")
    expect(msg.text).to.equal("Hi ")
  })

})
