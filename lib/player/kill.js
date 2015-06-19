var childProcess = require('child_process'),
  isWindows = require('../isWindows'),
  linuxCommand = 'kill -- -$(ps -o pgid= $PID | grep -o [0-9]*)',
  windowsCommand = 'taskkill /PID $PID /T /F';

exports.sync = function killSync(pid) {
  var command = isWindows ? windowsCommand : linuxCommand;
  command = command.replace('$PID', pid);
  console.log('Killing: ' + pid);
  childProcess.execSync(command);
};
