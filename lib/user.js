const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = Schema({
  contactId: String,
  source: String,
  accountType: String,
  name: String,
  state: String,
  metadata: String
})

UserSchema.statics.fromRequest = function(request) {
  return new Promise((resolve, reject) => {
    this.findOne({ contactId: request.contactId, source: request.source, accountType: request.accountType }, (err, res) => {
      if (err)
        reject(err)

      if (res)
        resolve(res)
      else {
        // we need to create one
        const user = new UserModel({ contactId: request.contactId, source: request.source, name: request.contactName, state: 'new', metadata: null })
        user.save((err, result) => {
          if (err)
            reject(err)
          else
            resolve(user)
        });
      }
    })
  });
}


const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
