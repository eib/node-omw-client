var playImpl = require('./play'),
  kill = require('./kill'),
  child;

exports.play = function play(file) {
  exports.stop();

  child = playImpl(file);

  console.log('PID: ' + child.pid);
  child.on('error', exports.onError);
  child.on('exit', exports.onExit);
};

exports.onError = function (err) {
  console.log('Error:', err.message || err);
};

exports.onExit = function (code, signal) {
  if (code !== 0) {
    console.log('Exited with code ' + code + ', signal ' + signal);
  }
  child = null;
};

exports.stop = function () {
  if (child) {
    console.log('Stopping ' + child.pid);
    kill.sync(child.pid);
  }
  child = null;
};
