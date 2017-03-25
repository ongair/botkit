const Ongair = require('ongair')
const { isTest, isProd } = require('./env')

function send(contact, messages, client=null) {
  return new Promise(function(resolve, reject) {
    if (client == null)
      client = getClient(contact)

    if (!isProd())
      setTimeout(() => {
        resolve(true)
      }, 500)
    else
    {
      client.sendThread(contact.contactId, messages)
        .then(success => {
          resolve(success)
        })
        .catch(ex => {
          reject(ex)
        })
    }
  });
}

function getClient(contact, url='https://ongair.im/api/v1/base') {
  let token = contact.accountType == 'MessengerV2' ? process.env.ONGAIR_TOKEN : process.env.ONGAIR_TOKEN_B
  return new Ongair.Client(token, url)
}

module.exports = send
