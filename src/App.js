import React from 'react';
import Header from"./components/Header"
import {  Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import { useAuth } from './context/GlobalContext';
import { useEffect } from 'react';
import { Auth } from './firebase';

import HomePage from './components/HomePage';
import CheckOut from './components/CheckOut';
import Payment from './components/Payment';


const App = () => {
  const {dispatch}=useAuth();
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
        <Route  path='/' element={
        <>
        <Header/>
        <HomePage/>
        </>}/>
        <Route  path='/login' element={<Login/>}/>
        <Route path='/checkout' element={ 
         <>
           <Header/>
            <CheckOut/>
         </>
        } /> 
        <Route  path='/payment' element={
        <>
          <Header/>
          <Payment/>
        </>
      }/>
        <Route   path='*' element={<h1> this  is page  not found </h1>}/>

       
       </Routes>
    </div>
  )
}

export default App

