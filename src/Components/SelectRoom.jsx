import { TextField } from '@material-ui/core';
import React, { useState } from 'react'

export default function SelectRoom() {
    const [roomID, setroomID] = useState("");
    const [roomName, setRoomName] = useState("");

    const handleRoomID = (e)=>{
        setEmail(e.target.value); 
        console.log(roomID);
   }
   const handleRoomName = (e)=>{
    setRoomName(e.target.value);
     
   }

   const clearInputs = ()=>{
    setroomID('');
    setRoomName('');
}
const [Emailerror, setEmailError] = useState("");

    return (
        <div style={{width:"100%", padding:"5%"}}>
            <h2 style={{color:"#4b5a6c"}}>Join Room Live:</h2>
            
            <div className="form">
            <form   >
                    <TextField
                        variant="outlined"
                        
                        required
                        fullWidth
                        id="joinRoom"
                        label="Enter Rooom ID"
                        name="roomID"
                        autoComplete="off"
                        autoFocus
                        value={roomID}
                        onChange={handleRoomID}
                    />
                    <p className="errorMsg">{Emailerror}</p>
                    <h3 style={{textAlign:"center", color:"#4b5a6c"}} >OR:</h3>
                    <h2 style={{color:"#4b5a6c"}}>Open a new Room:</h2>
                    <TextField
                        variant="outlined"
                        
                        required
                        fullWidth
                        name="roomName"
                        label="Enter Room Name"
                        type="text"
                        id="openRoom"
                        autoComplete="off"
                        value={roomName}
                        onChange={handleRoomName}
                    />
                    </form>
            </div>
            
        </div>
    )
}
