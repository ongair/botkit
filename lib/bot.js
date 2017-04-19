const User = require('./user')
const Request = require('./request')

module.exports = {

  respond: (req, res, Wizard) => {

    const request = new Request(req)

    if (process.env.NODE_ENV == 'production')
      console.log('Request', request)

    if (request.isIncomingMessage())
      User.fromRequest(request)
        .then(user => {
          const wizard = new Wizard(user)
          wizard.progress(request.text)
            .then(result => {
              res.json({
                success: true
              })
            })
        })
        .catch(err => {
          res.status(500).send('Error:' + err)
        })
    else
      res.json({ success: true, ignored: true })
  },

  version: (req, res, version) => {
    res.json({ version: version })
  }
}
