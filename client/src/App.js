import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// Socket connection
// Must be connected to the server
const socket = io.connect("http://localhost:7777");

function App() {
  const [messages, appendMessages] = useState([]);
  const [room, setRoom] = useState("");
  const [previousRoom, setPreviousRoom] = useState("");
  const [joinName, setJoinName] = useState(null);

  useEffect(() => {

    // Listener for "receiveMessage" emit event
    socket.on("receiveMessage", (data) => {
      appendMessages(prev => [...prev, data]);
    });

    // Listener for "announceJoin" emit event
    socket.on("announceJoin", data => {
      setJoinName(data.name)
    })

    return () => {
      // clean up
      socket.off("receiveMessage")
      socket.off("announceJoin")
    }

  }, [])

  function joinRoom() {
    appendMessages([])
    setRoom(document.getElementById('custom-room-id').value);
    setPreviousRoom(room);
  }

  useEffect(() => {
    // Effect if room has changed

    // Emit a "joinRoom" event 
    socket.emit("joinRoom", { room: room, previousRoom: previousRoom })
  }, [previousRoom, room])

  function sendMessage() {
    const messageText = document.getElementById('message-text').value

    if (messageText === '') return;

    // Emit a sendMessage event and pass room ID and message text JSON
    socket.emit("sendMessage", { room: room, message: messageText });

    document.getElementById('message-text').value = ""
  }

  return (
    <div className="App">
      {
        joinName === null
          ? null
          : <p className="join-announce">{joinName} joined the chat.</p>
      }
      <div className="form-box">
        <input id="custom-room-id" placeholder="Room" type="text" />
        <button onClick={joinRoom}>Join</button>
        {
          room !== "" ?
            <h4>You have joined room <span style={{ color: "green" }}>{room}</span></h4>
            : null
        }
        <div className="messages">
          {
            messages.map((message, index) => (
              <p key={index}>{message}</p>
            ))
          }
        </div>
        <textarea id="message-text" placeholder="text message" />
        <button onClick={sendMessage}>Send</button>
      </div>
      <Footer />
    </div>
  );
}

function Footer() {
  return <p className="footer">Made with love by <a target="_blank" rel="noreferrer" href="https://github.com/markcalendario">Mark Kenneth Calendario</a></p>
}

export default App;
