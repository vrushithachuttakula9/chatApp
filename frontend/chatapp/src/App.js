import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
// import { nanoid } from 'nanoid';



const socket = io("http://localhost:5000");

import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    // const userName = nanoid(4);

    socket.emit("chat", { message })
    setMessage('')
  }

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload])
    })
  })

  return (
    <div className="App">
      <header className='App-header'>
        <h1>Chat App</h1>
        {chat.map((payload, index) => {
          return (
                <p key={index}>{payload.message}</p>
          )
        }
        )}
        <form onSubmit={sendChat}>
          <input
            type="text"
            name="chat"
            placeholder="send text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
            }}
          />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
