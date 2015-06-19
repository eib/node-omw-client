var spawn = require('child_process').spawn,
  isWindows = require('../isWindows'),
  musicPlayer,
  preArgs = [],
  postArgs = [],
  options = {
    detached: true,
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
  preArgs = [ '--vol', '-450' ]; //start at -4.5db
}

module.exports = function play(file) {
  var args = preArgs.concat(file, postArgs);
  console.log('Executing:', [ musicPlayer ].concat(args).join(' '));
  console.log('Options:', JSON.stringify(options));
  return spawn(musicPlayer, args, options);
};
