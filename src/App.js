import React from 'react';
import Header from"./components/Header"
import {  Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import { UseAuth } from './context/GlobalContext';
import { useEffect } from 'react';
import { Auth } from './firebase';
const App = () => {
  const {dispatch}=UseAuth();
  useEffect(()=>{
    Auth.onAuthStateChanged((AuthUser)=>{
      if(AuthUser){
        dispatch({
          type:"SET_USER",
          user:AuthUser

        })
      }
      else{
        dispatch({
          type:"SET_USER",
          user:null

        })

      }
    })
  })
  return (
    <div className='app'>
       <Routes>
        <Route  path='/' element={<Header/>}/>
        <Route  path='/login' element={<Login/>}/>
        <Route   path='*' element={<h1> this  is page  not found </h1>}/>

       
       </Routes>
    </div>
  )
}

export default App

