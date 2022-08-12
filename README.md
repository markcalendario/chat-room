
# Socket.io Guide

An implementation guide for Socket.io with React.JS


## Documentation

[For Server](https://socket.io/docs/v4/)

[For Client](https://socket.io/docs/v4/client-api/)


## Lessons Learned

**Socket.io allows developers to create custom event.**

For example the client emits an event called **hello** with JSON data

```javascript
// React Client
import { io } from "socket.io-client";
const socket = io("[url where to connect]");

// emit a hello event with a JSON-parsed data
socket.emit("hello", data);
```

The server will wait and listen to the **hello** event from the server like this

```javascript
import { Server } from "socket.io";
const io = new Server(PORT);

// Establish a connection
io.on("connection", (socket) => {
  // receive a message from the hello event from sent emitted by client
  socket.on("hello", (data) => {
    // process the data
  });
});
```

**Socket.io has a room feature**

Socket clients can join to a specific room
```javascript
// server
...
socket.join(roomID);
...
```

Clients can also leave from the room

```javascript
// server
...
socket.leave(roomID);
...
```
_Note: Joining and Leaving statements should be wrapped inside the emit event listeners (socket.on(...args)) sent by the client_

**You can emit or send an event to a specific rooms**

Emitting events to a particular room is possible with socket.io. 

See the actual emit cheatsheet [here](https://stackoverflow.com/a/10099325/15958428) and [here](https://socket.io/docs/v3/emit-cheatsheet/)

```javascript
// server

// sending to sender-client only
socket.emit('event_here', data.message);

// sending to all clients, include sender
io.emit('event_here', data.message);

// sending to all clients except sender
socket.broadcast.emit('event_here', data.message);

// sending to all clients in 'room' except sender
socket.broadcast.to(data.room).emit('event_here', data.message);

// sending to all clients in room, include sender
io.in(data.room).emit('event_here', data.message);

// sending to sender client, only if they are in room
socket.to(room).emit('event_here', data.message);

// sending to all clients in namespace 'myNamespace', include sender
io.of('myNamespace').emit('event_here', data.message);

// sending to individual socketid
socket.broadcast.to(socketid).emit('event_here', data.message);

```




## Tech Stack

**Client:** React

**Server:** Node, Socket.io


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Authors

- [@markcalendario](https://www.github.com/markcalendario)

