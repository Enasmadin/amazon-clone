import React from 'react'
import { Link } from 'react-router-dom';
import "./Header.css"
import { UseAuth } from '../context/GlobalContext';
import { Auth } from '../firebase';


function Header() {
  const {user}=UseAuth();
  const handelSignOut = ()=>{
    Auth.signOut();  
  }
  return (
    <div className='header'>
        <Link to="/">
            <img src='../images/header-logo.Png' className='header-logo' alt=""/>
        </Link>
        <div className='header-search' >
           <input type='text' className='header-searchInput'/>
           <img src='../images/icons/searchIcon.Png'alt='' className='header-searchIcon'/>
        </div>
        <div className='header-nav'>
          <Link to={!user && "/login"}>
            <div className='header-option' onClick={handelSignOut}>
              <div className='header-optionLineOne'> Hello {user?`${user.email}`:"Gust"}</div>
              <div className='header-optionLineTwo'> {user?"Sign Out":"Sign In"} </div>
            </div>
          </Link>
          <Link to="/orders">
            <div className='header-option'>
              <div className='header-optionLineOne'> Returns </div>
              <div className='header-optionLineTwo'> & Orders </div>
            </div>
          </Link>
          <Link to="" >
            <div className='header-option'>
              <div className='header-optionLineOne'> Your </div>
              <div className='header-optionLineTwo'> & Prime </div>
            </div>
          </Link>
          <Link to="/checkout">
            <div className='header-optionBasket'>
             <img src='../images/icons/shopping-cart.png'  alt=''/>
              <span className='header-optionLineTwo header-basketCount'> 5 </span>
            </div>
          </Link> 
        </div>
     
    </div>
  )
}

export default Header
