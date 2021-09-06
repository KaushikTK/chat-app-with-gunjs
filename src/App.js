import React, { useState } from 'react'
import ChatUI from './ChatUI'

function App() {
  const [login, showLogin] = useState(true)
  const [chat, showChat] = useState(false)

  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])

  const [currentUser, setCurrentUser] = useState('')
  const [name, setName] = useState('')
  const [roomName, setRoomName] = useState('')


  const enterChat = () => {
    setCurrentUser(name)
    setUsers([...users, name])
    showLogin(false)
    showChat(true)
    setName('')
  }

  return (
    <>
    {chat && <ChatUI 
    users={users}
    currentUser={currentUser} 
    roomName={roomName}
    messages={messages} 
    setMessages={setMessages} />}

    {login && 
    <>
      <div className="container">
        <div className='row vh-100 mx-auto'>
          <div className='col-md-7 mx-auto my-auto'>
            <div className='card border-0 mx-auto my-auto'>
              <h6 className='display-4 pb-3 text-center font-weight-bold'>Decentralised Chat</h6>
              <input type='text' placeholder='Room Name' value={roomName} onInput={e=>setRoomName(e.target.value)} className='form-control mb-2' />
              <input type='text' placeholder='Name' value={name} onInput={e=>setName(e.target.value)} className='form-control mb-2' />
              <button className='btn btn-primary mt-2 col-sm-10 shadow mx-auto' onClick={enterChat}>Enter</button>
            </div>
          </div>
        </div>
      </div>
    </>
    }
    </>
  )
}

export default App;
