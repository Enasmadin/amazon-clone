import React from 'react';
import checkOutImage from"../images/checkoutAd.jpg"
import { useAuth } from '../context/GlobalContext';
import CheckOoutProduct from './CheckOoutProduct';
import"./CheckOut.css"
import Subtotal from './Subtotal';

function CheckOut() {
    const {user,basket}= useAuth()
  return (
    <div className='checkout'>
        <div className='check-out-left'>
            <img className='checked-out-ad' src={checkOutImage} alt=""/>
        
        <h3> hello, {user?.email}</h3>
        <h2 className='check-out-title'>    Your shopping Basket  </h2>
        <div>
        { basket.length > 0 ?
        (
            basket.map((item)=>(<>
            <CheckOoutProduct 
             key={item.id} 
              id={item.id}
             title={item.title}
             rating={item.rating}
             price={item.price}
            image={item.image}
            />
            </>)))
            :(<p> 
              you have no items in your basket .To buy more or more 
              click "Add To basket "
            </p>)

           
        }
        </div>
      </div>
      <div className='check-out-right'>
        <Subtotal/>

      </div>
    </div>
  )
}

export default CheckOut
