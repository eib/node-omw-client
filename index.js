var path = require('path'),
  glob = require('glob'),
  slash = require('slash'),
  io = require('socket.io-client'),
  os = require("os"),
  player = require('./lib/player'),
  url = (process.env.REMOTE_URL || 'http://localhost:8001').trim(),
  name = (process.env.SERVER_NAME || os.hostname()).trim(),
  musicDir = (process.env.MUSIC_DIR || (__dirname + '/music')).trim(),
  socket = io.connect(url);

function findFiles(pattern, workingDir) {
  console.log('Pattern: ', pattern);
  console.log('Dir: "' + workingDir + '"');
  return glob.sync(pattern, { cwd: workingDir });
}

function findMusicFiles() {
  return findFiles('**/*.mp3', slash(musicDir));
}

function mapFilesToItems(files) {
  console.log('Files:', files);
  return files.map(function (file) {
    return {
      id: file,
      name: path.basename(file, path.extname(file)),
    };
  });
}

function registerItems(items) {
  socket.emit('register', { name: name, items: items }, function (response) {
    console.log('Sent items:', JSON.stringify(response));
  });
}

function register() {
  return Promise.resolve()
    .then(findMusicFiles)
    .then(mapFilesToItems)
    .then(registerItems);
}

function playItem(item) {
  var filePath = path.join(musicDir, item.id);
  console.log('Playing ' + filePath);
  player.play(filePath);
}

console.log('Opening ', url);

socket.on('connect', function () {
  console.log('Connect');
  register();
});

socket.on('selectItem', function (data) {
  console.log('Selected:', JSON.stringify(data));
  playItem(data.item);
});

socket.on('error', function (err) {
  console.log('Error:', err.message || err);
});

process.on('SIGINT', function () {
  console.log('Shutting down....');
  player.stop();
  process.exit(2);
});

process.on('exit', function () {
  player.stop();
});
