import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import { Switch } from '@material-ui/core';
import Home from './Pages/Home/Home';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>  
     <Header/>
      
      <Route exact path='/' render={()=>(<Home />)}  />
      {/* <Route exact path='/images' render={()=>(<Images data={this.state.imageUrls} />)}  /> */}
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
