const net = require('net');

const server = net.createServer((socket) => {
  const target = net.createConnection({ host: '127.0.0.1', port: 3000 }, () => {
    socket.pipe(target);
    target.pipe(socket);
  });
  target.on('error', (err) => {
    socket.destroy();
  });
  socket.on('error', (err) => {
    target.destroy();
  });
});

server.listen(5173, '0.0.0.0', () => {
  console.log('Port 5173 proxying to 3000');
});
server.on('error', (err) => {
  console.log('Port 5173 proxy note:', err.message);
});
