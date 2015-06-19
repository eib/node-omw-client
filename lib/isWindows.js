var os = require('os'),
 isWindows = /^win/.test(os.platform());

console.log('OS: ' + os.platform());
module.exports = isWindows;
