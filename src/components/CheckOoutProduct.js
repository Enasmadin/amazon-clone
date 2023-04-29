import React from 'react';
import starIcon from"../images/icon/star.png";
import"./CheckOutProduct.css"
import { useAuth } from '../context/GlobalContext';


const CheckOoutProduct = ({image,title,id,price,rating}) => {
    const {dispatch}= useAuth();
    const removeFromBasket = ()=>{
        dispatch({
            type:"REMOVE_FROM_BASKET",
            id:id
        })
    }

  return (
    <div className='CheckOutProduct' key={id}>
        <img className='checkoutproduct-image' src={image} alt="" />
        <div className='Checkoutproduct-info'>
            <p className='Checkoutproduct-title'>{title} </p>
            <p className='checkoutproduct-price'>
                <small> $ </small>
                <strong> {price}</strong>
            </p>
        
        <div className='checkoutproduct-rating'>
            {
                Array(rating).fill()
                .map((_,i)=>(

                    <p key={i}>
                    <img src={starIcon} alt="star-icon"/>
                   </p>
                   
                ))
            }
           

        </div>

        <button onClick={removeFromBasket}> Remove From Basket </button>
    </div>
    </div>
  )
}

export default CheckOoutProduct
