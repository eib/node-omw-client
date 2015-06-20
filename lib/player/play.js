var spawn = require('child_process').spawn,
  isWindows = require('../isWindows'),
  isMac = require('../isMac'),
  maxVolumePercent = 200,
  minVolumePercent = 10,
  musicPlayer,
  preArgs = [],
  options = {
    detached: !isWindows,
    stdio: 'ignore',
  },
  volumeFormatter = function percentFormatter(volumePercent) {
    console.log('Volume:', volumePercent);
    return String(volumePercent);
  },
  formatArgs = function (file, volume) {
    return preArgs.concat(volume, file);
  };

if (process.env.MUSIC_PLAYER) {
  musicPlayer = process.env.MUSIC_PLAYER.trim();
} else if (isWindows) {
  musicPlayer = "\\Program Files (x86)\\VideoLAN\\VLC\\vlc.exe";
  preArgs = [ '--intf', 'dummy', '--play-and-exit', '--volume' ];
} else if (isMac) {
  musicPlayer = '/usr/bin/afplay';
  formatArgs = function (file) {
    return [ file ];
  };
} else {
  //TODO: given a few obvious/standard paths, find out which ones exist
  musicPlayer = '/usr/bin/omxplayer';
  preArgs = [ '--vol' ];
  maxVolumePercent = 150;
  volumeFormatter = function millibelFormatter(volumePercent) {
    var decibels = Math.log10(volumePercent / 100),
      millibels = decibels * 100;
    return String(millibels);
  };
}

module.exports = function play(file, volumePercent) {
  volumePercent = Math.max(minVolumePercent, Math.min(maxVolumePercent, volumePercent));
  var volume = volumeFormatter(volumePercent),
    args = formatArgs(file, volume);
  console.log('Executing:', [ musicPlayer ].concat(args).join(' '));
  console.log('Options:', JSON.stringify(options));
  return spawn(musicPlayer, args, options);
};
