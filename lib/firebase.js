const request = require('request')

function retrieve(user) {
  return new Promise((resolve, reject) => {
    let url = process.env.FIREBASE_URL + "/users.json?orderBy=\"id\"&equalTo=\"" + user.id + "\""
    request({ url: url, method: 'GET' }, (err, response, body) => {
      if (err)
        resolve(false)
      else {
        if (body.length > 2)
          resolve(body)
        else
          resolve(false)
      }
    })
  })
}

function findOrCreate(userJson) {
  return new Promise((resolve, reject) => {
    retrieve(userJson)
      .then(user => {

        if(user) {
          let obj = JSON.parse(user)
          let key = Object.keys(obj)[0]
          let usr = obj[key]
          resolve(usr)
        }
        else {
          save(userJson)
            .then(usr => {
              if (usr)
                resolve(userJson)
            })
        }
      })
  })
}

function save(user, method='POST') {
  return new Promise((resolve, reject) => {
    let url = process.env.FIREBASE_URL + "/users.json"
    request({ url: url, method: method, json: user }, (err, response, body) => {
      if (err)
        resolve(false)
      else {
        resolve(body.name)
      }
    })
  })
}

module.exports = {

  get: retrieve,
  save: save,
  load: findOrCreate,
  update: (id, userParams) => {
    return new Promise((resolve, reject) => {
      if (process.env.NODE_ENV == 'production') {
        retrieve({ id: id })
          .then(user => {
            let obj = JSON.parse(user)
            let key = Object.keys(obj)[0]
            let object = Object.assign(obj[key], userParams)

            let url = process.env.FIREBASE_URL + "/users/" + key + ".json"
            request({ url: url, method: 'PUT', json: object }, (err, response, body) => {
              if (err)
                resolve(false)
              else {
                resolve(body)
              }
            })
          })
      }
      else {
        resolve(Object.assign({ id: id }, userParams))
      }
    })
  }

}
