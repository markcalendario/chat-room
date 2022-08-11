import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:7777");

function App() {
  const [messages, appendMessages] = useState([]);
  const [room, setRoom] = useState("");
  const [previousRoom, setPreviousRoom] = useState("");
  const [joinName, setJoinName] = useState(null);

  useEffect(() => {

    socket.on("receiveMessage", (data) => {
      appendMessages(prev => [...prev, data]);
    });


    socket.on("announceJoin", data => {
      setJoinName(data.name)
    })

    return () => {
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
    console.log("called");
    socket.emit("joinRoom", { room: room, previousRoom: previousRoom })
  }, [previousRoom, room])

  function sendMessage() {
    const messageText = document.getElementById('message-text').value

    if (messageText === '') {
      return;
    }
    document.getElementById('message-text').value = ""
    socket.emit("sendMessage", { room: room, message: messageText });
  }

  return (
    <div style={{ fontFamily: 'Arial' }} className="App">
      {
        joinName === null
          ? null
          : <p style={{ color: 'green' }}>{joinName} joined the chat.</p>
      }
      <input id="custom-room-id" placeholder="Select or input custom room" type="text" />
      <button onClick={joinRoom}>Join</button>
      <br /><br />
      {
        messages.map((message, index) => (
          <h3 key={index}>{message}</h3>
        ))
      }
      <br /><br />
      <textarea id="message-text" placeholder="text message" />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
