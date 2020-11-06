import { IconButton } from '@material-ui/core';
import { ArrowUpward, Cancel } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';

export default function Post(props) {
    const[message, setMessage]= useState(props.message);
    const[votes, setVotes]= useState(props.votes);

    useEffect(()=>{

    },[])

    const updatePostVotes=()=>{
        console.log("in update votes method")
        
        db.collection("rooms").doc(props.roomid).collection("posts").doc(props.id).update({
           votes: props.votes + 1
        })

    }


    return (
        <div className="postComponent" style={postStyle}>
            <h3> {props.message}</h3>
            <h3 style={{marginLeft:"auto", color:"#de6310"}}>{props.votes}</h3>
            <IconButton onClick={updatePostVotes} >
            <ArrowUpward style={{color: "#de6310"}} />
            </IconButton>
            <Cancel style={{color:"red", marginLeft:"10px"}}/>
        </div>
    )
}
const postStyle={
    width:"75vw",
    background:"#ededed",
    borderRadius:"10px",
    padding: "20px",
    margin:"10px",
    display:"flex",
    alignItems:"center"
}