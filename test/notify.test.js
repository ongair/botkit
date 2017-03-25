const chai = require('chai')
const chaiAsPromised = require("chai-as-promised")
const send = require('../lib/notify')
const sinon = require('sinon')
const Ongair = require('ongair')

process.env.ONGAIR_TOKEN = 'abc'
process.env.NODE_ENV = 'test'

chai.should();
chai.use(chaiAsPromised)

describe('Notifications', () => {

  it('Can send multiple messages', (done) => {
    let messages = [{ text: 'Hi', options: null }, { text: 'How are you', options: null}]
    let success = true
    send({ accountType: 'MessengerV2', }, messages).should.eventually.eql(success).notify(done)
  })
})
