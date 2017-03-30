const names = require('humanname')
class Message {
  constructor(user, text, options=null) {
    let name = user ? user.name : null
    this.text = this.personalize(text, name)
    this.options = options
  }

  personalize(text, name) {
    if (name) {
      let first_name = names.parse(name).firstName

      text = text.replace(new RegExp('{{first_name}}','g'), first_name)
      return text.replace(new RegExp('{{name}}','g'), name)
    }
    else {
      text = text.replace(new RegExp('{{first_name}}','g'), '')
      return text.replace(new RegExp('{{name}}','g'), '')
    }
  }
}


module.exports = Message
