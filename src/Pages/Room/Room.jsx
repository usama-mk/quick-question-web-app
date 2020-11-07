import { Button, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Post from '../../Components/Post'
import { db } from '../../firebase';

export default function Room(props) {
    const postData=[
    {
        message:"hello ji",
        vote: 10
    },
    {
        message:"Waya kana",
        vote: 7
    },
    {
        message:"Snga e?",
        vote: 5
    },
]

const [newPost, setNewPost]= useState("");
const [posts, setPosts]= useState([]);
const [roomName, setRoomName]= useState("");
const {roomid} = useParams();
const [currentVotes, setCurrentVotes]= useState(0);
const [currentPostId, setCurrentVotesId]= useState("");

useEffect(()=>{
    db.collection("rooms").doc(roomid).onSnapshot((snapshot)=>{
        if(snapshot.data()){
        setRoomName(snapshot.data().roomName)
        }
        else{
            alert("NO ROOM EXISTS ON THE ENTERED ID");
        }
        db.collection("rooms").doc(roomid).collection("posts").orderBy("votes", "desc").onSnapshot((snapshot)=>
        { 
            if(snapshot.docs.length!=0){
            setPosts(snapshot.docs.map(doc => 
                doc.data()
                ))
            }  
            else{
                setPosts([])
            }               
        })

    });
},[]);

const handleNewPost = (e)=>{
    setNewPost(e.target.value); 
    console.log(newPost);
    
   
    }

const postToDb=()=>{
     // push newPost to db
     const ref = db.collection('rooms').doc(roomid).collection("posts").doc()
     console.log(ref.id)  // prints the unique id

     ref.set({
        post: newPost,
        createdBy: props.user.email,
        votes: 0,
        id: ref.id,
        upvotedBy:[] , 
        downgradedBy:[]
     })
    //  db.collection("rooms").doc(roomid).collection("posts").add({
    //     post: newPost,
    //     createdBy: props.user.email,
    //     votes: 0

    // })
    setNewPost("");
}

const deleteRoom = ()=>{
    db.collection("rooms").doc(roomid).delete();
    //  link to home
}


   
    return (
        <div className="roomMain" style={{padding:"20px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"  }}>
           <Link to="/">
           <Button onClick={deleteRoom}>Delete Room</Button></Link>
           <div className="roomHeader" style={roomHeaderStyle}>
                 <h1>Room ID: {roomid} </h1>
    <h1 style={{marginLeft:"auto"}}>{`**${roomName}**`}</h1>           
           </div>
           <div className="roomContent" style={roomContentStyle}>
              {posts.map((currentPostData)=>{
                     
                return   <Post message={currentPostData.post} votes={currentPostData.votes} id={currentPostData.id} roomid={roomid} user={props.user} upvotedBy={currentPostData.upvotedBy} downgradedBy={currentPostData.downgradedBy}  />
              })}
           </div>
           <div className="roomFooter" style={roomFooterStyle}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        placeholder="Enter your own post..."
                        name="newPost"
                        label="Enter your own post..."
                        type="text"
                        id="newPost"
                        autoComplete="off"
                        value={newPost}
                        onChange={handleNewPost}
                    />
                 <Button style={submitButtonStyle} onClick={postToDb}>Submit</Button>
           </div>
        </div>
    )
}
const roomHeaderStyle=
{display:"flex",
 justifyContent:"space-between",
  backgroundColor:"#ededed", 
  padding:"5px", 
  borderRadius:"20px",
   width:"80vw"
}
const roomFooterStyle=
{display:"flex",
  
  backgroundColor:"#ededed", 
  padding:"20px", 
  borderRadius:"20px",
   width:"80vw"
}
const roomContentStyle={
    padding:"10px",
    backgroundColor:"#fbe2a0",
    margin: "10px",
    borderRadius:"20px",
    width:"80vw",
    display:"flex",
    flexDirection:"column",
    alignItems:"center"
}
const submitButtonStyle={marginLeft:"auto",
 backgroundColor:"#de6310", 
 color:"white", 
 paddingLeft:"20px",
  paddingRight:"20px",
   marginLeft:"10px",
}