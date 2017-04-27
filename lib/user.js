const mongoose = require('mongoose')
const { Schema } = mongoose
mongoose.Promise = global.Promise

const UserSchema = Schema(
  {
    contactId: String,
    source: String,
    accountType: String,
    name: String,
    state: String,
    metadata: String
  },
  {
    timestamps: true
  }
)

const UserModel = mongoose.model('User', UserSchema)

class User {

  constructor(request) {
    this.loaded = false
    this.request = request
    this.data = null
  }

  id() {
    return this.contactId
  }

  getState() {
    return this.state
  }

  setState(val) {
    return this.state = val
  }

  get(key) {
    let json = this.metadata ? JSON.parse(this.metadata) : {}
    return json[key]
  }

  set(key, value) {
    let json = this.metadata ? JSON.parse(this.metadata) : {}
    json[key] = value
    this.metadata = JSON.stringify(json)
  }

  load() {
    return new Promise((resolve, reject) => {
      let req = this.request
      UserModel.findOne({ contactId: req.contactId, source: req.source, accountType: req.accountType }, (err, res) => {
        if (err)
          reject(err)

        if (res) {
          this.data = res
          this.state = res.state
          this.name = res.name
          this.contactId = res.contactId
          this.metadata = res.metadata
          this.source = res.source
          this.accountType = res.accountType
          this.loaded = true
          resolve(this)
        }
        else {
          // you need to create it
          let data = new UserModel({ contactId: req.contactId, accountType: req.accountType, source: req.source, name: req.contactName, state: 'new', metadata: null })
          data.save((err, res) => {
            if (err)
              reject(err)
            else {
              this.loaded = true
              // this.data = data
              this.state = data.state
              this.name = data.name
              this.contactId = data.contactId
              this.metadata = data.metadata
              this.source = data.source
              this.accountType = data.accountType
              resolve(this)
            }
          })
        }
      })
    })
  }
}

module.exports = {
  Model: UserModel,
  User: User
}



// UserSchema.statics.fromRequest = function(request) {
//   return new Promise((resolve, reject) => {
//     this.findOne({ contactId: request.contactId, source: request.source, accountType: request.accountType }, (err, res) => {
//       if (err)
//         reject(err)
//
//       if (res)
//         resolve(res)
//       else {
//         // we need to create one
//         const user = new UserModel({ contactId: request.contactId, source: request.source, name: request.contactName, state: 'new', metadata: null })
//         user.save((err, result) => {
//           if (err)
//             reject(err)
//           else
//             resolve(user)
//         });
//       }
//     })
//   });
// }
//
//
// const UserModel = mongoose.model('User', UserSchema)
//
// module.exports = UserModel
