import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import Post from '../../Components/Post'

export default function Room() {
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

const handleNewPost = (e)=>{
    setNewPost(e.target.value); 
    console.log(newPost);
    const tempPost={
        message: newPost,
        vote: 0
    }
    postData.push(tempPost);
}
   
    return (
        <div className="roomMain" style={{padding:"20px", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"  }}>
           <div className="roomHeader" style={roomHeaderStyle}>
                 <h1>Room ID: </h1>
                 <h1 style={{marginLeft:"auto"}}>**Room Name**</h1>           
           </div>
           <div className="roomContent" style={roomContentStyle}>
              {postData.map((currentPostData)=>{
                     
                return   <Post message={currentPostData.message} votes={currentPostData.vote}/>
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
                 <Button style={submitButtonStyle}>Submit</Button>
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