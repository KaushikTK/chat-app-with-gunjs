import { Message } from 'react-chat-ui'

const createMessageItem = (message, senderName) => {
    return new Message({
        id:0,
        message: message,
        senderName: senderName,
    })
}

export {createMessageItem}