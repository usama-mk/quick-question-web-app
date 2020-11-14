import { Button, Container, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import { db } from '../firebase';

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
    const idForRoom= Math.floor(100000 + Math.random() * 900000).toString();
    if (roomName) {
        //some clever DB stuff
        db.collection('rooms').add({
            roomName: roomName,
            roomCreatedBy: props.user.email,
            idForRoom: idForRoom,
        })
    }
    db.collection("rooms").get().then(function(querySnapshot) {
     
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            if(doc.data().roomName==roomName){
        //    setRoomID(doc.id);  don't set it instantly and causes problems
           alert(`your room id is:${idForRoom}`)
           pageURL= `${pageURL}/${doc.id}`;
           history.push(pageURL);
                       }
        });
    });
   

}

const joinRoom=(pageURL)=>{
    var idForRoom="";
  //get Firebase collection id for the entered roomID(by user)
  db.collection("rooms").where("idForRoom", "==", roomID).get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          idForRoom= doc.id;
          console.log(idForRoom)
          pageURL= `${pageURL}/${idForRoom}`;
      });
      history.push(pageURL);
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });


  
}

    return (
        <Container component="main" maxWidth="xs">
            <h2 style={{color:"#4b5a6c"}}>Join Room Live:</h2>
            
            <div className="form"  style={{width:"100%", padding:"5%"}}>
            
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
                    <div style={{display:"flex", justifyContent:"flex-start", marginTop:"5px"}}>
                        <Button style={{color:"red", backgroundColor:"#f8bc5d"}} onClick={()=>{joinRoom("/room")}} >Join Room</Button>
                    </div>
                    <p className="errorMsg">{Emailerror}</p>
                    <h3 style={{textAlign:"center", color:"#4b5a6c"}} >OR:</h3>
                    <h2 style={{color:"#4b5a6c", marginBottom:"15px"}}>Open a new Room:</h2>
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
                    <div style={{display:"flex", justifyContent:"flex-start", marginTop:"5px"}}>
                        <Button style={{color:"red", backgroundColor:"#f8bc5d"}} onClick={()=>{openRoom("/room")}}>Open Room</Button>
                    </div>
                    
            </div>
            
        </Container>
    )
}
export default withRouter(SelectRoom);