import React from 'react';
import moment from 'moment/moment';
import { useAuth } from '../context/GlobalContext';
import CheckOoutProduct from './CheckOoutProduct';
import CurrencyFormat from 'react-currency-format';
import"./oneorder.css"

const OneOrder = ({order}) => {
    const {basket} = useAuth()
  return (
    <div>
         <div className='order'>
        <h2> order </h2>
        <p> {moment.unix(order.data.created).format("MMMM DD YYYY h:mma")}</p>
        <p className="order-id"> 
           {order.id}
        </p>
        {order.data.basket?.map((item)=>(
            <CheckOoutProduct
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
            hideenButton

            />
        ))}
         <CurrencyFormat
             renderText={
            (value)=>(
          
             
              <p className='order-total'> order Total {value}</p>  
           
             )
             }
            value={order.data.amount} 
            displayType={'text'}
            thousandSeparator={true} 
            prefix={'$'}
            decimalScale={2}
          />
      
    </div>
      
    </div>
  )
}

export default OneOrder
