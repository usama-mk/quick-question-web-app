import React from 'react';
import logo from '../../Assets/QQ Logo.png';
import Login from '../../Components/Login';
import SelectRoom from '../../Components/SelectRoom';
import './Home.css'


export default function Home(props) {
    return (
        <div style={{display:"flex", height:"100%"}} className="mainHome">

            <div style={{width:"50%", height:"100%" , minHeight:"100%"}} className="leftHome">
              <div   style={{display:"flex" , flexDirection:"column",  alignItems:"center", justifyContent:"center", margin:"12%" }}>
                  <img src={logo} width="50%" height="30%" alt="Logo"/>
                 <div style={{ margin:"15px", }}>
                     <h4 style={{color:"#4b5a6c"}}>

                 Sponsored to stay free for education users by:
                     </h4>
                     <div style={{ border:"black solid 2px" ,backgroundColor:"white", color:"black", paddingLeft:"10%", paddingRight:"10%", paddingTop:"5%", paddingBottom:"5%"}}>
                         <h2>
                         Google Ads placeholder
                         </h2>
                     </div>
                 </div>
              </div>
            </div>


            <div style={{width:"50%", height:"100%" , minHeight:"100%", padding:"3%"}} className="RightHome">
                <h1 style={{color:"#4b5a6c"}}>
                {props.user? <h2>Enter Room:</h2> : <h2>Log In / Sign Up:</h2> }
                </h1>
              <div   style={{display:"flex" , flexDirection:"column",  alignItems:"flex-start", justifyContent:"center" , backgroundColor:"#fbe2a0" }}>
                 {props.user? <SelectRoom user={props.user}/> :<Login/>}
              </div>
            </div>
        </div>
    )
}
