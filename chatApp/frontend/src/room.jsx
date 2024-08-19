import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function room(){
    const navigate = useNavigate()
    const [room,setRoom] = useState('')

    const roomSubmit = (event)=>{
        event.preventDefault()
        console.log(room)
        navigate('/message',{state:{room:room}})
    }

    return (
        <>
            <div>
                <form onSubmit={roomSubmit}>
                    <input 
                    name = 'room' 
                    value={room} 
                    type="text"
                    onChange = {(e)=> setRoom(e.target.value)} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}