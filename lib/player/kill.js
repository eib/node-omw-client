var childProcess = require('child_process'),
  isWindows = require('../isWindows'),
  isMac = require('../isMac'),
  linuxCommand = 'kill -- -$(ps -o pgid= $PID | grep -o [0-9]*)',
  windowsCommand = 'taskkill /PID $PID /T /F',
  macCommand = 'kill -9 $PID';

exports.sync = function killSync(pid) {
  var command = isWindows ? windowsCommand : (isMac ? macCommand : linuxCommand);
  command = command.replace('$PID', pid);
  console.log('Stopping: ' + pid);
  childProcess.execSync(command);
};
