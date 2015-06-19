var childProcess = require('child_process'),
  isWindows = require('../isWindows'),
  musicPlayer,
  preArgs = [],
  postArgs = [],
  options = {
    stdio: 'ignore',
  };

if (process.env.MUSIC_PLAYER) {
  musicPlayer = process.env.MUSIC_PLAYER.trim();
} else if (isWindows) {
  musicPlayer = "\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe";
  preArgs = [ '--intf', 'dummy', '--play-and-exit' ];
} else {
  //TODO: given a few obvious/standard paths, find out which ones exist
  musicPlayer = '/usr/bin/omxplayer';
}

module.exports = function play(file) {
  var args = preArgs.concat(file, postArgs);
  return childProcess.execFile(musicPlayer, args, options, function (err) {
    if (err) {
      console.log('Error playing ' + file + ':', err.message || err);
    }
    child = null;
  });
};
