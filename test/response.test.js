const chai = require('chai')
const { expect } = chai;

const Response = require('../lib/response.js')

describe('Responses', () => {
  it('Can return a random personalized response', () => {

    const welcome = new Response(['Hi {{user}}, my name is Trevor', 'What are you?'], ['Human', 'Alien'])
    let expected = [{ text: "Hi Alex, my name is Trevor", options: null }, { text: "What are you?", options: ['Human', 'Alien'] }]
    let messages = welcome.getMessages({ name: 'Alex' })

    expect(expected).to.eql(messages)
  })
})
