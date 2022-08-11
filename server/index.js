const server = require('http').createServer();

const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const adj = ["Brainy", "Cute", "Beautiful", "Amiable", "Lovely"];
const noun = ["Fox", "Dog", "Dino", "Cat", "Bat"];

io.on('connection', client => {
  client.on("joinRoom", data => {
    client.leave(data.previousRoom);
    client.join(data.room);


    if (data.room !== "") {
      let joinName = adj[Math.floor(Math.random() * adj.length)] + " " + noun[Math.floor(Math.random() * noun.length)]
      client.broadcast.to(data.room).emit("announceJoin", { name: joinName });
    }
  })

  client.on("sendMessage", (data) => {
    io.to(data.room).emit('receiveMessage', data.message);
    /*
    // sending to sender-client only
    client.emit('receiveMessage', data.message);

    // sending to all clients, include sender
    io.emit('receiveMessage', data.message);

    // sending to all clients except sender
    client.broadcast.emit('receiveMessage', data.message);

    // sending to all clients in 'room' room(channel) except sender
    client.broadcast.to(data.room).emit('receiveMessage', data.message);

    // sending to all clients in room room(channel), include sender
    io.in(data.room).emit('receiveMessage', data.message);

    // sending to sender client, only if they are in room room(channel)
    client.to(room).emit('receiveMessage', data.message);

    // sending to all clients in namespace 'myNamespace', include sender
    io.of('myNamespace').emit('receiveMessage', data.message);

    // sending to individual socketid
    client.broadcast.to(socketid).emit('receiveMessage', data.message);
    */
  })
});

server.listen(7777);