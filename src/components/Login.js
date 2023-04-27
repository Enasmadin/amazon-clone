import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from '../firebase';
import { useAuth } from '../context/GlobalContext';

function Login() {
  const [Email,setEmail]=useState("");
  const [Password,setPassword]=useState("");
  const {user} = useAuth();
  const Navigate= useNavigate();
  console.log(user);
  const handelSigIn = (e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(Auth,Email,Password).then((auth)=>{
       if(auth){
        Navigate("/");
       }
    })

  }

  const register = (e)=>{
  
    e.preventDefault()

    createUserWithEmailAndPassword(Auth,Email,Password).then((auth)=>{
      if(auth){
         Navigate("/");
      }
    })
    .catch((error)=>{
      alert(error.message)
    })
    
  }
  return (
    <div className='login'>
        <Link to="/">
            <img src='../images/login-logo.Png' className='login-logo' alt=""/>
        </Link>
        <div className='login-container'>
           <h1> Sign in </h1>
           <form>
            <h5> Email </h5>
            <input  type='email' value={Email} onChange={(e)=>setEmail(e.target.value)}/>
            <h5> Password </h5>
            <input  type='password' value={Password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className='signInButton' type='submit' onClick={handelSigIn} >
                signInButton
            </button>
            <p>
            By continuing, you agree to Amazon's Fake Clone Conditions of Use
            and Privacy Notice.
            </p>
            <button className='registerBtn' onClick={register}>
            Create your Amazon Account
            </button>
           </form>
        </div>
      
    </div>
  )
}

export default Login
