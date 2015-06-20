var os = require('os'),
  isMac = /^darwin/.test(os.platform());

module.exports = isMac;
