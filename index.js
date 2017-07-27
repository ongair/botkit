// const User = require('./lib/user')
const Request = require('./lib/request')
const Wizard = require('./lib/wizard')
const Step = require('./lib/step')
const FuzzyStep = require('./lib/fuzzy_step')
const Message = require('./lib/message')
const EmailStep = require('./lib/steps/email')
const PhoneStep = require('./lib/steps/phone')
const YesNoStep = require('./lib/steps/yesno')
const FieldStep = require('./lib/steps/field')
const Option = require('./lib/option')
const MenuStep = require('./lib/menu')
const { respond, version } = require('./lib/bot')
const { User } = require('./lib/user')
const firebase = require('./lin/firebase')


module.exports = {
  Request: Request,
  Wizard: Wizard,
  Step: Step,
  FuzzyStep: FuzzyStep,
  Message: Message,
  Email: EmailStep,
  Phone: PhoneStep,
  Option: Option,
  Menu: MenuStep,
  YesNoStep: YesNoStep,
  FieldStep: FieldStep,
  version: version,
  respond: respond,
  User: User,
  firebase: firebase
}
