import { Button, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
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
const [owner, setOwner]= useState("");


useEffect(()=>{
    db.collection("rooms").doc(roomid).onSnapshot((snapshot)=>{
        if(snapshot.data()){
        setRoomName(snapshot.data().roomName)
        if(snapshot.data().roomCreatedBy== props.user.email){
            setOwner(true);
        }
        else{
            setOwner(false)
        }
        }
        else{
            history.push("/")
            // alert("NO ROOM EXISTS ON THE ENTERED ID");
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
     if( document.getElementById("postButton").disabled != true){
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
    submitPoll();
     }
}
function submitPoll(){
    document.getElementById("postButton").disabled = true;
    document.getElementById("postButton").style.backgroundColor="grey";
    setTimeout(function(){document.getElementById("postButton").disabled = false;
    document.getElementById("postButton").style.backgroundColor="#de6310";
},30000);
}

const history = useHistory()
const deleteRoom = ()=>{
    if (window.confirm('Are you sure you want to end this Session/Room?')) {
        db.collection("rooms").doc(roomid).delete().then(()=>{
            history.push("/");
           
        }) 
        //  link to home
      
        
      } else {
        // Do nothing!
        
        
      }
   
}


   
    return (
        <div className="roomMain" style={{padding:"20px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"  }}>
         {owner &&   
           <Button onClick={deleteRoom} style={{background:"red", color:"white", marginBottom:"5px"}}>Close Room</Button>}
           <div className="roomHeader" style={roomHeaderStyle}>
                 <h1 style={{overflow:"auto",
 flexWrap:"wrap",}}>Room ID: {roomid} </h1>
    <h1 style={{marginLeft:"auto"}}>{`**${roomName}**`}</h1>           
           </div>
           <div className="roomContent" style={roomContentStyle}>
              {posts.map((currentPostData)=>{
                     
                return   <Post message={currentPostData.post} votes={currentPostData.votes} id={currentPostData.id} roomid={roomid} user={props.user} upvotedBy={currentPostData.upvotedBy} downgradedBy={currentPostData.downgradedBy} createdBy={currentPostData.createdBy} owner={owner}  />
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
                 <Button  id="postButton" style={submitButtonStyle} onClick={postToDb}>Submit</Button>
           </div>
        </div>
    )
}
const roomHeaderStyle=
{display:"flex",
 justifyContent:"space-between",
 overflow:"auto",
 flexWrap:"wrap",
//  overflowWrap:"break-word",
//  whiteSpace:"nowrap", overflow:"auto", borderLeft:"1em solid transparent", borderRight:"1em solid transparent", textOverflow:"ellipsis",
  backgroundColor:"#ededed", 
  padding:"5px", 
  borderRadius:"20px",
   width:"80vw",
   
}
const roomFooterStyle=
{display:"flex",
  backgroundColor:"#ededed", 
  padding:"20px", 
  borderRadius:"20px",
   width:"80vw",
   position:"fixed",
   bottom:"2vh"
}
const roomContentStyle={
    padding:"10px",
    backgroundColor:"#fbe2a0",
    margin: "10px",
    borderRadius:"20px",
    width:"80vw",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    marginBottom:"16vh"
}
const submitButtonStyle={marginLeft:"auto",
 backgroundColor:"#de6310", 
 color:"white", 
 paddingLeft:"20px",
  paddingRight:"20px",
   marginLeft:"10px",
}