import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import io from 'socket.io-client'

const socket = io('http://localhost:3000')

export default function message(){

    
    const [message, setMessage] = useState('')
    const [messages,setMessages] = useState([])
    const location = useLocation()
    const state = location.state || {}
    const room = state.room

    useEffect(()=>{
        socket.emit('joinRoom',room)
    },[])

    useEffect(() => {
        const handleMessage = (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };
    
        socket.on('message', handleMessage);
    
        return () => {
            socket.off('message', handleMessage);
        };
    }, []);
    

    useEffect(()=>{
        console.log('Current messages:',messages)
    },[messages])

    const messageSubmit = (event)=>{
        event.preventDefault()
        socket.emit('sendMessage',room,message)
        setMessage('')
    }
    return (
        <>
                <div className="sendMessage">
                    <form onSubmit={messageSubmit}>
                        <input 
                        type="text"
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                         />
                         <button type='submit'>Send</button>
                    </form>
                </div>
        </>
    )
}