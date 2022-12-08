import React, { useState } from 'react'
import './App.css'
import io from 'socket.io-client'
import Chat from './Chat'


const socket = io.connect("https://doublechatapp.herokuapp.com/")
const App = () => {
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [showChat, setShowChat] = useState(false);

  const handleClick = async() => {
    if (userName && roomId) {
      console.log('firing the event');
      await socket.emit('join__room', roomId)
      setShowChat(true);
    }
  }
  return (
    <div className="App">
      {!showChat ? <div className="joinChatContainer">
        <h3>Join a chat</h3>
        <input placeholder="John....." value={userName} onChange={e => setUserName(e.target.value)} />
        <input placeholder="Room Id....." value={roomId} onChange={e => setRoomId(e.target.value)} />
        <button onClick={handleClick}>Join a room</button>
        </div>
        :
        <Chat socket={socket} userName={userName} roomId={roomId} />
      }
    </div>
  )
}

export default App

