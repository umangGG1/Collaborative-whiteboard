const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});


const whiteboards = {};

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on('createWhiteboard', (callback) => {
    const whiteboardId = generateUniqueId();
    whiteboards[whiteboardId] = { users: {} };
    console.log(`Whiteboard created with ID: ${whiteboardId}`);
    if (typeof callback === 'function') {
      callback(whiteboardId);
    }
  });

  socket.on('joinWhiteboard', ({ whiteboardId, userName }, callback) => {
    if (whiteboards[whiteboardId]) {
      whiteboards[whiteboardId].users[socket.id] = userName;
      socket.join(whiteboardId);
      io.in(whiteboardId).emit('updateUsers', Object.values(whiteboards[whiteboardId].users));
      if (typeof callback === 'function') {
        callback({ status: 'ok' });
      }
    } else {
      if (typeof callback === 'function') {
        callback({ status: 'error', message: 'Whiteboard not found' });
      }
    }
  });

  socket.on('drawing', (data) => {
    socket.to(data.whiteboardId).emit('drawing', data);
  });

  socket.on('cursorMove', ({ x, y, whiteboardId }) => {
    socket.to(whiteboardId).emit('updateCursors', { [socket.id]: { x, y } });
  });

  socket.on('undoDrawing', ({ whiteboardId, lastLine }) => {
    socket.to(whiteboardId).emit('undoDrawing', { lastLine });
  });

  socket.on('redoDrawing', ({ whiteboardId, nextLines }) => {
    socket.to(whiteboardId).emit('redoDrawing', { nextLines });
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
    for (const whiteboardId in whiteboards) {
      if (whiteboards[whiteboardId].users[socket.id]) {
        delete whiteboards[whiteboardId].users[socket.id];
        io.in(whiteboardId).emit('updateUsers', Object.values(whiteboards[whiteboardId].users));
      }
    }
  });
});

const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
