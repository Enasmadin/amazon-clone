import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { useAuth } from '../context/GlobalContext';

const Subtotal = () => {
    const {basket}=useAuth();
   
  return (
    <div className='subtotal'>
       <CurrencyFormat
        renderText={
            (value)=>(
             <>
             <p>
              Subtotal({basket.length} items): <strong> {value}</strong>  
             </p>
             </>
            )
        }
        value={2} 
       displayType={'text'}
       thousandSeparator={true} 
       prefix={'$'}
       decimalScale={2}
       /> 
      
    </div>
  )
}

export default Subtotal
