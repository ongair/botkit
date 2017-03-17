function Step(entry=null,exit=null) {
  this.entry = entry
  this.exit = exit
}

Step.prototype.enter = function (input) {
  return this.entry && this.entry(input)
};

Step.prototype.leave = function (input) {
  return this.exit && this.exit(input)
}

module.exports = Step
