var io = require('socket.io-client'),
  url = process.env.REMOTE_URL || 'http://localhost:8001',
  socket = io.connect(url),
  name = process.env.SERVER_NAME || 'omw-client',
  items = [
      { name: 'a', id: 1 },
      { name: 'b', id: 2 },
      { name: 'c', id: 3 },
    ];

function register() {
  socket.emit('register', { name: name, items: items }, function (response) {
    console.log('Sent items:', JSON.stringify(response));
  });
}

console.log('Opening ', url);

socket.on('connect', function () {
  console.log('Connect');
  register();
});

socket.on('selectItem', function (data) {
  console.log('Selected:', JSON.stringify(data));
});

socket.on('error', function (err) {
  console.log('Error:', err.message || err);
});
