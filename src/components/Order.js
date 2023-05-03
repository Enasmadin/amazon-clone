
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/GlobalContext';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import OneOrder from './OneOrder';
import "./order.css"


const Order = () => {
  const [orders,setOrders]=useState([]);
  const {user}= useAuth();
  useEffect(()=>{
    if(user){
      const collRef = collection(db,"users",user?.uid ,"orders");
      const orderRef = query(collRef,orderBy("created","desc"));
      onSnapshot(orderRef,(querysnapshot)=>{
        setOrders(
          querysnapshot.docs.map((doc)=>(
            {
              id:doc.id,
              data:doc.data()
            }
          ))
        )
      }
      )
    }
    else{
      setOrders([]);
    }

  },[user])
  return (
    <div className='orders'>
    <h1> your orders</h1>
    <div className='orders-order'>
       {
        orders?.map((order)=>(
          <OneOrder order={order}/>
        ))
       }
    </div>
    
  </div>
  )
}

export default Order
