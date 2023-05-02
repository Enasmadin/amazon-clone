import React from 'react';
import Header from"./components/Header"
import {  Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import { useAuth } from './context/GlobalContext';
import { useEffect } from 'react';
import { Auth } from './firebase';
import {loadStripe} from '@stripe/stripe-js';

import HomePage from './components/HomePage';
import CheckOut from './components/CheckOut';
import Payment from './components/Payment';
import { Elements } from '@stripe/react-stripe-js';
import Order from './components/Order';



const App = () => {
  const {dispatch}=useAuth();
  const stripepromise = loadStripe('pk_test_51N2uwJAtJzS8k6rhNgXVOjTiNKftkK0TOzDoOsFOUarJmOyAyrBpV2gOX6gHPQ1Pm99dPZzyPqetj6QVkEGsShj3006w1REZdH')
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
          <Elements stripe={stripepromise}>
            <Payment/>
          </Elements>
        </>
      }/>
      <Route path='/order' element={
        <>
          <Header/>
          <Order/>
        </>
      }
        />

    
        <Route   path='*' element={<h1> this  is page  not found </h1>}/>

       
       </Routes>
    </div>
  )
}

export default App

