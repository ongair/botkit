const sinon = require('sinon')
const chai = require('chai')
const { expect } = chai;
require ('sinon-mongoose')

const User = require('../lib/user.js')
const Request  = require('../lib/request.js')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

describe('It can handle users', () => {

  const req = { body: { notification_type: 'MessageReceived', text: 'Hi', name: 'Lily', external_contact_id: 'contactId', id: 'messageId', account_type: 'MessengerV2', account: '1234567890' } }
  const request = new Request(req)

  const UserMock = sinon.mock(User);

  it('Should the contact if it exists', () => {
    UserMock.expects('findOne').withArgs({ contactId: request.contactId, source: request.source, accountType: request.accountType }).yields(null, { contactId: request.contactId })
    User.fromRequest(request)
      .then((user) => {
        expect(user.contactId).to.equal(request.contactId)
      })
  })

  it('Should save the contact if it does not exist', () => {
    UserMock.expects('findOne').withArgs({ contactId: request.contactId, source: request.source, accountType: request.accountType }).yields(null, null)
    User.fromRequest(request)
      .then((user) => {
        expect(user.contactId).to.equal(request.contactId)
        expect(user.state).to.equal('new')
        expect(user.metadata).to.equal(null)
      })
  })
})
