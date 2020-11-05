import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';

 function SelectRoom(props) {
    const { history } = props;
    const [roomID, setRoomID] = useState("");
    const [roomName, setRoomName] = useState("");
    

    const handleRoomID = (e)=>{
        setRoomID(e.target.value); 
        console.log(roomID);
   }
   const handleRoomName = (e)=>{
    setRoomName(e.target.value);
     
   }

   const clearInputs = ()=>{
    setRoomID('');
    setRoomName('');
}
const [Emailerror, setEmailError] = useState("");

// useEffect(()=>{
//     db.collection("rooms").doc(`${roomId}`).onSnapshot((snapshot)=>{
//         setRoomName(snapshot.data().name)
    
//     db.collection("rooms").doc(roomId).collection("messages").orderBy("timeStamp" , "asc").onSnapshot((snapshot)=>
//     (
//         setMessages(snapshot.docs.map(doc => 
//             doc.data()
//             ))
//     ))

//     });
// },[roomId]);

const openRoom=(pageURL)=>{

}

const joinRoom=(pageURL)=>{
   pageURL= `${pageURL}/${roomID}`;
history.push(pageURL);
}

    return (
        <div style={{width:"100%", padding:"5%"}}>
            <h2 style={{color:"#4b5a6c"}}>Join Room Live:</h2>
            
            <div className="form">
            
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
                    <div style={{display:"flex", justifyContent:"flex-end", marginTop:"5px"}}>
                        <Button style={{color:"red", backgroundColor:"#f8bc5d"}} onClick={()=>{joinRoom("/room")}} >Open Room</Button>
                    </div>
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
                    <div style={{display:"flex", justifyContent:"flex-end", marginTop:"5px"}}>
                        <Button style={{color:"red", backgroundColor:"#f8bc5d"}} onClick={()=>{openRoom()}}>Join Room</Button>
                    </div>
                    
            </div>
            
        </div>
    )
}
export default withRouter(SelectRoom);