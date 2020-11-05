import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import { Switch } from '@material-ui/core';
import Home from './Pages/Home/Home';
import  firebaseApp  from './firebase';
import { useEffect, useState } from 'react';
import Room from './Pages/Room/Room';


function App() {

  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const handleLogout= ()=>{
    firebaseApp.auth().signOut();
}
const clearInputs = ()=>{
  setEmail('');
  setPassword('');
}

const authListener = ()=>{
    firebaseApp.auth().onAuthStateChanged((user)=>{
        if(user){
            clearInputs();
            setUser(user);
        }
        else{
            setUser("");
        }
    })
}
useEffect(()=>{
    authListener();
    
},[]);

  return (
    <div className="App">
      
      <BrowserRouter>  
     <Header user={user}/>
      
      <Route exact path='/' render={()=>(<Home user={user} />)}  />
      <Route exact path='/room/:roomid' render={()=>(<Room  user={user} />)}  />
      {/* <Route exact path='/videos' render={()=>(< Videos data={this.state.videoUrls} />)}  /> */}
      {/* <Route exact path='/newsletter' render={()=>(<Newsletter data={this.state.pdfUrls} />)}  /> */}
      {/* <Route exact path='/pressreleases' render={()=>(<PressReleases data={this.state.pdfUrls} />)}  /> */}
      {/* <Route exact path='/contactus' render={()=>(<ContactUs data={this.state.pdfUrls} />)}  /> */}
      {/* <Route exact path='/adminlogin' render={()=>(<Login  />)}  /> */}
 
     
   </BrowserRouter>
       
    </div>
  );
}

export default App;
