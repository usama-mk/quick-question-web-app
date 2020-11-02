import React from 'react';
import logo from '../../Assets/QQ Logo.png';


export default function Home() {
    return (
        <div style={{display:"flex", height:"100%"}} className="mainHome">
            <div style={{width:"50%", height:"100%" , minHeight:"100%"}} className="leftHome">
              <div   style={{display:"flex" , flexDirection:"column",  alignItems:"center", justifyContent:"center", margin:"15px" }}>
                  <img src={logo} width="40%" height="30%" alt="Logo"/>
                 <div style={{ margin:"15px", }}>
                     <h4 style={{color:"#4b5a6c"}}>

                 Sponsored to stay free for education users by:
                     </h4>
                 </div>
              </div>
            </div>
            <div style={{width:"50%"}} className="rightHome">
             hi
            </div>
        </div>
    )
}
