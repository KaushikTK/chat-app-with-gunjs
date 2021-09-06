import Gun from 'gun'
//import {open} from 'gun'
import open from 'gun/lib/open'
import then from 'gun/lib/then'
import React, { useEffect, useRef, useState } from 'react'
import { ChatFeed } from 'react-chat-ui'
import { createMessageItem } from './utils'

const ChatUI = ({currentUser, messages, roomName, setMessages}) => {

    const [message, setMessage] = useState('')
    const [h, setH] = useState(window.innerHeight)
    const ip = useRef()
    const head = useRef()
    const gun = Gun({peers:['http://localhost:4000/gun']})

    const sendMessage = () => {
        if(!message) return;
        const msg = createMessageItem(message, currentUser)
        gun.get(roomName).get(new Date().toISOString()).put({message:msg.message, senderName:msg.senderName, id:msg.id})
        setMessage('')
    }

    var listenerHandler = async(value) => {
        let KEYS = Object.keys(value)
        let updatedMessages = []
        for(let i=1;i<KEYS.length;i++){
            const data =  await gun.get(roomName).get(KEYS[i]).then()
            if(!data.message) continue;
            if(data.senderName === currentUser) data.id=0;
            else data.id=1;
            updatedMessages.push({id:data.id, message:data.message, senderName:data.senderName})
        }
        setMessages([...updatedMessages])
    }

    const check = async() => {
        let olderMessages = []
        let KEYS = []
        try {
            KEYS = Object.keys(await gun.get(roomName).then())
        } catch (error) {
            return
        }
        for(let i=0;i<KEYS.length;i++){
            let data = await gun.get(roomName).get(KEYS[i]).then()
            if(!data.message) continue;
            if(data.senderName === currentUser) data.id=0;
            else data.id=1;
            olderMessages.push({id:data.id, message:data.message, senderName:data.senderName})
        }
        setMessages([...olderMessages])
    }

    useEffect(()=>{
        check()
        gun.get(roomName).on(listenerHandler,{change:true})
    },[])

    useEffect(()=>{
        console.log(ip.current.offsetHeight)
        console.log(h)
        setH((h-ip.current.offsetHeight-head.current.offsetHeight-15) + 'px')
    },[])

    return(
    <>
        <div className='container'>
            <div className='row vh-100 mx-auto'>
                <div className='col vh-100'>
                <div className='row border-primary border-bottom' ref={head}>
                    <h6 className='display-4 w-100'>
                    {roomName}
                    <div className='display-4 my-auto small float-right font-weight-light'>
                    <small>{currentUser}</small>
                    </div>
                    </h6>
                </div>
                <div style={{height:h, overflowY:'auto'}}>
                <ChatFeed 
                    messages={messages}
                    hasInputField={false}
                    showSenderName
                />
                </div>
                <div>
                <div className='row fixed-bottom' ref={ip}>
                    <div className='container'>
                        <div className='row mx-auto'>
                            <div className='col-md-10 mx-auto'>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" value={message} onInput={e=>setMessage(e.target.value)} placeholder="Message" />
                                <div className="input-group-append">
                                <span className="input-group-text btn" onClick={sendMessage}>SEND</span>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default ChatUI