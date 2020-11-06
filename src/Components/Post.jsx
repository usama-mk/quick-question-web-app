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
        var alreadyVoted="";
        console.log("in update votes method")
        //retrieve posts and check if the user has upvoted already
        db.collection("rooms").doc(props.roomid).collection("posts").doc(props.id).get()
        .then(function(doc) {
          if (doc.exists) {
            if(doc.data().upvotedBy != null) {
               for(var i = 0; i < doc.data().upvotedBy.length; i++) {
                   if(doc.data().upvotedBy[i]==props.user.email){
                    console.log("voters check")
                    alreadyVoted=true;
                    break;
                   }
               }
               //If you write this function outside db.coll block it will cause problems, as db.coll takes time while executing data from db and hence alreadyVoted value doesn't update and it's already ran
               if(!alreadyVoted){
                //push his name into upvoters and make an upvote
              props.upvotedBy.push(props.user.email);
              console.log(props.upvotedBy)
              //never use dynamic value while pushing to db, it causes problems
              db.collection("rooms").doc(props.roomid).collection("posts").doc(props.id).update({
                  votes: props.votes + 1,
                  upvotedBy: props.upvotedBy
              })

            }


            } 
            
             
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }).catch(function(error) {
          console.log("Error getting document:", error);
        });
                    
        

    }

    const deletePost=()=>{
        db.collection("rooms").doc(props.roomid).collection("posts").doc(props.id).delete();
    }


    return (
        <div className="postComponent" style={postStyle}>
            <h3> {props.message}</h3>
            <h3 style={{marginLeft:"auto", color:"#de6310"}}>{props.votes}</h3>
            <IconButton onClick={updatePostVotes} id="updatePost" >
            <ArrowUpward style={{color: "#de6310"}} />
            </IconButton>
            <IconButton onClick={deletePost}>
            <Cancel style={{color:"red", marginLeft:"10px"}}/>
            </IconButton>
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