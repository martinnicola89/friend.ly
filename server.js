const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
})

let users = [];

const addUser = (userId,socketId) => {
  !users.some(user=>user.userId === userId) &&
    users.push({'userId': userId, 'socketId': socketId});
}

const removeUser = (socketId) => {
  users = users.filter(user=>user['socketId'] !== socketId)
}

const getUser = (userId)=>{
  return users.find(user=>user['userId'] === userId)
}

io.on("connection", (socket) => {
  socket.on("send-user", userId=>{
    addUser(userId, socket.id)
    io.emit("get-users", users)
  });

  // send and get a message
  socket.on("send-message", ({senderId, receiverId, text})=>{

    const receivedUser = getUser(receiverId);
    if (receivedUser) {
      io.to(receivedUser['socketId']).emit("get-message", {
        'senderId': senderId,
        'text': text,
      })
    } else {
      const user = getUser(senderId);
      io.to(user['socketId']).emit("get-message", {
        'receiverId': receiverId,
        'text': text,
      })
    }

  })

  socket.on("disconnect", ()=>{
    removeUser(socket.id)
    io.emit("get-users", users)
  })
})

require('dotenv').config()
require('./config/database.js')

const app = express();

app.use(logger('dev'));
app.use(express.json());

// Configure both serve-favicon & static middlewares
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(require('./config/auth'));
// Put API routes here, before the "catch all" route
app.use('/api/users/profile', require('./routes/api/profiles'));
app.use('/api/conversations', require('./routes/api/conversations'));
app.use('/api/messages', require('./routes/api/messages'));
app.use('/api/users', require('./routes/api/users'));
// Mount our custom auth middleware to protect routes below it. These routes will have access to the "req.user" variable.


// The following "catch all" route (note the *)is necessary
// for a SPA's client-side routing to properly work
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});