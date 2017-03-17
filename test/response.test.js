const chai = require('chai')
const { expect } = chai;

const Response = require('../lib/response.js')

describe('Responses', () => {
  it('Can return a random personalized response', () => {

    const welcome = new Response(['Hi {{user}}, my name is Trevor'],null)
    let expected = { text: "Hi Alex, my name is Trevor", options: null }
    let random = welcome.getRandom({ name: 'Alex' })
    
    expect(expected.text).to.equal(random.text)
    expect(expected.options).to.equal(random.options)

  })
})
