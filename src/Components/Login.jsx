import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebaseApp from '../firebase';
import './Login.css';
import { Input } from '@material-ui/core';
 

function Copyright() {
    return ( 
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit">
                Your Website 
      </Link>
      {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}




const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        marginTop: '5px',
        backgroundColor: "#ed7d31",
        color: "white",
       
       
    },
    contained: {
        "&:hover": {
          backgroundColor: "#de6310"
        }
      },
}));


function Login(props) {
   
    const classes = useStyles();
    const [user, setUser] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [Emailerror, setEmailError] = useState("");
const [passwordError, setPasswordError] = useState("");
const [signup, setSignup] = useState("");

const handleLogin = ()=>{
    clearErrors();
    firebaseApp.auth().signInWithEmailAndPassword(email, password).catch(error=>{
        switch(error.code){
            case "auth/invalid-email":
            case "auth/user-disabled":
            case "auth/user-not-found":
                setEmailError(error.message);
                console.log("error")
                break;
            case "auth/wrong-password":
                setPasswordError(error.message);
                console.log("error")
                break;
            
        }
    })
    console.log(`user is: ${user}`)
}

const handleLogout= ()=>{
    firebaseApp.auth().signOut();
    
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

const toggleSignup = ()=>{
    setSignup(!signup);
}

const handleSignup = ()=>{
    firebaseApp.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
}

useEffect(()=>{
    authListener();
},[]);


    const handleEmail = (e)=>{
        setEmail(e.target.value); 
        console.log(email);
   }
   const handlePassword = (e)=>{
    setPassword(e.target.value);
     
   }

   const clearInputs = ()=>{
    setEmail('');
    setPassword('');
}

const clearErrors = ()=>{
  setEmailError('');
  setPasswordError('');
}

    return (
        <div>
            { 
            
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            
            <div className={classes.paper}>
               
                <form className={classes.form} >
                    <TextField
                        variant="outlined"
                        
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={handleEmail}
                    />
                    <p className="errorMsg">{Emailerror}</p>
                    <TextField
                        variant="outlined"
                        
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={handlePassword}
                    />
                    <p className="errorMsg">{passwordError}</p>
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                  {signup?<Button
                        
                        fullWidth
                        variant="contained"
                         
                        className={`${classes.submit} ${ classes.contained}`}
                        onClick={handleSignup}
                    >
                        Sign Up
          </Button>: <Button
                        
                        fullWidth
                        variant="contained"
                         
                        className={`${classes.submit} ${ classes.contained}`}
                        onClick={handleLogin}
                    >
                        Sign In
          </Button> }  
          <div style={{textAlign:"center"}}>
          <h2>
              OR:
          </h2>
          </div>
         <div style={{backgroundColor:"white", paddingLeft:"5%", paddingRight:"5%", display:"flex", justifyContent:"center", alignItems:"center" }}>
         <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png" width="20" height="20" style={{marginRight:"15px"}}  alt="Google Logo"/>
         <h4>
              Login with Google
          </h4>
         </div>
                    { <Grid container>
                        {/* <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
              </Link>
                        </Grid> */}
                        <Grid style={{margin:"20px"}} item>
                            <Link onClick={toggleSignup} href="#" variant="body2" style={{color:"#4b5a6c" }} >
                                {"New user? Create Account"}
                            </Link>
                        </Grid>
                    </Grid> }
                </form>
            </div>
            {/* <Box mt={8}>
                <Copyright />
            </Box> */}
        </Container>
            }
        </div>
    );
}
export default Login;