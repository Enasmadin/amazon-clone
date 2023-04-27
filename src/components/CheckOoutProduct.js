import React from 'react';
import starIcon from"../images/icon/star.png";
import"./CheckOutProduct.css"


const CheckOoutProduct = ({image,title,id,price,rating}) => {
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

        <button> Remove From Basket </button>
    </div>
    </div>
  )
}

export default CheckOoutProduct
