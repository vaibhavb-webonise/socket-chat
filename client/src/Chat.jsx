import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
const Chat = ({ socket, userName, roomId }) => {
    const [currentMessage, setCurrentMessage] = useState('')
    const [messages, setMessages] = useState([])

    const sendMessage = async () => {
        if (currentMessage) {
            const messageData = {
                room: roomId,
                author: userName,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit('send__message', messageData)
            setMessages(msg => [...msg, messageData])
            setCurrentMessage('')
        }
    }

    useEffect(() => {
        socket.on('receive__message', (data) => {
            setMessages(list => [...list, data]);
        })
    }, [socket])

    return (
        <div className="chat-window">
            <h2>Hi {userName}. you are in a room {roomId}</h2>
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {
                        messages.map((message, index) => (
                            <div className="message" key={index} id={userName !== message.author ? "you" : "other"}>
                                <div>
                                    <div className="message-content">
                                        <p>{message.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{message.time}</p>
                                        <p id="author">{message.author}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </ScrollToBottom>

            </div>
            <div className="chat-footer">
                <input placeholder="Hey...." value={currentMessage} onChange={e => setCurrentMessage(e.target.value)}
                    onKeyPress={e => { e.key === "Enter" && sendMessage() }} />
                <button onClick={sendMessage} disabled={!currentMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat
