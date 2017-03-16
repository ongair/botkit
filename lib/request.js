function Request(req) {
  console.log('called constructor')
  this.type = req.body.notification_type
  this.text = req.body.text
  this.contactId = req.body.external_contact_id
  this.contactName = req.body.name
  this.messageId = req.body.id
  this.accountType = req.body.account_type
  this.source = req.body.account
}

module.exports = Request
