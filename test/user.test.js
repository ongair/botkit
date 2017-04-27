const sinon = require('sinon')
const chai = require('chai')
const { expect } = chai;
require ('sinon-mongoose')

const { User, Model } = require('../lib/user.js')
const Request  = require('../lib/request.js')
const mongoose = require('mongoose')

describe('It can handle users', () => {

  const req = { body: { notification_type: 'MessageReceived', text: 'Hi', name: 'Lily', external_contact_id: 'contactId', id: 'messageId', account_type: 'MessengerV2', account: '1234567890' } }
  const request = new Request(req)

  const UserMock = sinon.mock(Model);

  it('Should the contact if it exists', (done) => {
    UserMock.expects('findOne').withArgs({ contactId: request.contactId, source: request.source, accountType: request.accountType }).yields(null, { contactId: request.contactId })
    let user = new User(request)
    expect(user.loaded).to.equal(false)

    user.load()
      .then(usr => {
        expect(usr.loaded).to.equal(true)
        expect(usr.id()).to.equal(request.contactId)
        done()
      })
  })

  // it('Should save the contact if it does not exist', (done) => {
  //   UserMock.expects('findOne').withArgs({ contactId: request.contactId, source: request.source, accountType: request.accountType }).yields(null, null)
  //   let user = new User(request)
  //   expect(user.loaded).to.equal(false)
  //
  //   user.load()
  //     .then(usr => {
  //       expect(usr.loaded).to.equal(true)
  //       expect(usr.state()).to.equal('new')
  //       done()
  //     })
  // })

  it('Should be able to save and retrieve metadata attributes', () => {
    let meta = "{\"accepted\":true}"
    let user = new User()
    user.metadata = meta

    user.setState('new')
    expect(user.getState()).to.equal('new')

    expect(user.get('accepted')).to.equal(true)
    user.set('accepted', false)
    expect(user.get('accepted')).to.equal(false)

    user.setMeta('accepted', true)
    expect(user.getMeta('accepted')).to.equal(true)

    user.clearMeta()
    expect(user.metadata).to.equal(null)
  })
})
