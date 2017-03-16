const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = Schema({
  externalId: String,
  source: String,
  name: String,
  state: String,
  metadata: String
})


const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
