class Request {
  constructor(req) {
    this.type = req.body.notification_type
    this.text = req.body.text
    this.contactId = req.body.external_contact_id
    this.contactName = req.body.name
    this.messageId = req.body.id
    this.accountType = req.body.account_type
    this.source = req.body.account
  }

  isIncomingMessage() {
    return this.type == 'MessageReceived'
  }
}

module.exports = Request
