const chai = require('chai')
const { expect } = chai;

const Request  = require('../lib/request.js')

describe('It can parse requests', () => {

  it('Should be able to create a request', () => {

    const req = { body: { notification_type: 'MessageReceived', text: 'Hi', name: 'Lily', external_contact_id: 'contactId', id: 'messageId', account_type: 'MessengerV2', account: '1234567890' } }
    const request = new Request(req)

    expect(request.type).to.equal('MessageReceived')
    expect(request.text).to.equal('Hi')
    expect(request.contactId).to.equal('contactId')
    expect(request.contactName).to.equal('Lily')
    expect(request.accountType).to.equal('MessengerV2')
    expect(request.source).to.equal('1234567890')
    expect(request.messageId).to.equal('messageId')

  })
})
