var playImpl = require('./play'),
  playlist = require('./playlist'),
  kill = require('./kill');

exports.play = function play(file, volumePercent) {
  exports.stop();

  var child = playImpl(file, volumePercent);
  playlist.add(child.pid);

  child.on('error', exports.onError);
  child.on('exit', exports.onExit.bind(exports, child.pid));
};

exports.onError = function (err) {
  console.log('Error:', err.message || err);
};

exports.onExit = function (pid, code, signal) {
  if (code !== 0) {
    console.log('Exited with code ' + code + ', signal ' + signal);
  }
  playlist.remove(pid);
};

exports.stop = function () {
  var pids = playlist.getAllPids();
  pids.forEach(function (pid) {
    kill.sync(pid);
    playlist.remove(pid);
  });
};
