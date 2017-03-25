module.exports = {
  isProd: () => { return process.env.NODE_ENV == 'production' },
  isTest: () => { return process.env.NODE_ENV == 'test' }
}
