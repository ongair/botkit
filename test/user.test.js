const sinon = require('sinon')
const chai = require('chai')
const { expect } = chai;
require ('sinon-mongoose')

const User = require('../lib/user.js')
const Request  = require('../lib/request.js')

describe('It can handle users', () => {

  it('Should the contact if it exists', () => {

    const req = { body: { notification_type: 'MessageReceived', text: 'Hi', name: 'Lily', external_contact_id: 'contactId', id: 'messageId', account_type: 'MessengerV2', account: '1234567890' } }
    const request = new Request(req)

    const UserMock = sinon.mock(User);
    UserMock.expects('findOne').withArgs({ contactId: request.contactId, source: request.source, accountType: request.accountType }).yields(null, { contactId: request.contactId })

    User.fromRequest(request)
      .then((user) => {
        expect(user.contactId).to.equal(request.contactId)
      })
      
  })
})
