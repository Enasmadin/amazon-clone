import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { useAuth } from '../context/GlobalContext';
import { getBasketTotal } from '../context/AppReducer';
import { useNavigate } from 'react-router-dom';
import "./Subtotal.css"

const Subtotal = () => {
    const {basket}=useAuth();
    const navigate = useNavigate();
   
  return (
    <div className='subtotal'>
       <CurrencyFormat
        renderText={
            (value)=>(
             <>
             <p>
              Subtotal({basket.length} items): <strong> {value}</strong>  
             </p>
             <small className='subtotal-gift'>
              <input  type='checkbox'/> This order contains a gift 

             </small>
             </>
            )
        }
        value={getBasketTotal(basket)} 
        displayType={'text'}
        thousandSeparator={true} 
       prefix={'$'}
       decimalScale={2}
       />
       <button onClick={()=>navigate("/payment")}> Proceed To Checkout </button> 
      
    </div>
  )
}

export default Subtotal
