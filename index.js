// const User = require('./lib/user')
const Request = require('./lib/request')
const Wizard = require('./lib/wizard')
const Step = require('./lib/step')
const FuzzyStep = require('./lib/fuzzy_step')
const Message = require('./lib/message')
const EmailStep = require('./lib/steps/email')
const PhoneStep = require('./lib/steps/phone')

module.exports = {
  Request: Request,
  Wizard: Wizard,
  Step: Step,
  FuzzyStep: FuzzyStep,
  Message: Message,
  Email: EmailStep,
  Phone: PhoneStep
}
