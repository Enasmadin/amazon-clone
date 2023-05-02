import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/GlobalContext'
import CheckOoutProduct from './CheckOoutProduct'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from '../context/AppReducer';
import "./payment.css"
import { CardElement,  useElements, useStripe } from '@stripe/react-stripe-js';
import axois from "./axois";
import { useEffect } from 'react'

import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'


const Payment = () => {
    const {basket,user,dispatch}=useAuth();
    const [clientSecret,setClientSecret]= useState();
    const [error,setError]=useState(null);
    const [disabled,setDisabled]=useState(true);
    const [successed,setSucced]=useState(false);
    const [proccesing,setProcessing]=useState("");
    const stripe = useStripe();
    
    const navigate = useNavigate();
    const elements = useElements();
   


    useEffect(()=>{
      const getClientSecret = async ()=>{
        const responce = await axois ({
          method:"post",
          url:`/payments/create?total=${getBasketTotal(basket)*100}`,

        });
        setClientSecret(responce.data.clientSecret);
        return responce ;

      };
      getClientSecret()
    },[basket] )
    const handelSubmit = async(e)=>{
     e.preventDefault();
     setProcessing(true);
     const payload =  await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
      
     }).then(({paymentIntent })=>{
      console.log(paymentIntent );
      const ref = doc(db, "users", user?.uid, "orders", paymentIntent.id);
      setDoc(ref, {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });
      setSucced(true);
      setError(null);
      setProcessing(false);
      navigate("/order", {replace: true});
      dispatch({
       type:"EMPRTY_BASKET" 
      })
     })

    }
    const handelChange = (e)=>{
      setDisabled(e.empty);
      setError(error? error.message: "" )

    }
  return (
    <div className='payment'>
        <div className='payment-container'>
            <h1> 
                checkout(<Link to="/checkout">{basket.length} items</Link>)
            </h1>
            {/* Payment Item */}
            <div className='payment-section'>
              <div className='payment-title'>
                  <h3> Delivery Adress</h3>
              </div>
              <div className='payment-address'>
                 <p> {user?.email}</p>
                 <p> Alexandria, Egypet</p>
              </div>
            </div>
            {/* Review Items */}
            <div className='payment-section'>
              <div className='payment-title'>
                  <h3> Review Items and delivery </h3>
              </div>
              <div className='payment-items'>
                {
                  basket.map((item)=>(
                    <CheckOoutProduct 
                    key={item.id} 
                     id={item.id}
                    title={item.title}
                    rating={item.rating}
                    price={item.price}
                   image={item.image}
                   />  
                  ))
                }
              </div>
            </div>
            {/* PAYMENT METHOD */}
            <div className='payment-section'>
             <h3> payment Method</h3>
             <div className="payment-details">
          <form onSubmit={handelSubmit}>
          <CardElement  onChange={handelChange}/>
           <div className='payment-priceContainer'>
            <CurrencyFormat
             renderText={
            (value)=>(
          
             <p>
              <strong> {value}</strong>  
             </p>
        
             )
             }
            value={getBasketTotal(basket)} 
            displayType={'text'}
            thousandSeparator={true} 
            prefix={'$'}
            decimalScale={2}
          />
       <button type='submit' disabled={successed || proccesing || disabled}> <span> {proccesing ? (<p> processing</p>) :(<p>  Buy Now</p>)} </span>  </button>

    
    </div>
    {
      error && 
      (<div> {error} </div>)
    }
 
   </form>
  </div>
</div>
</div>  
</div>
  )
}

export default Payment
