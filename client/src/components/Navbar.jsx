import React from 'react';
import './styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const nav = useNavigate();

  const handleBgr = ()=>{
    if(document.querySelector('.right-nav').style.left === "-100%"){
      document.querySelector('.right-nav').style.left = "0"
    }else{
      document.querySelector('.right-nav').style.left = "-100%"
    }
  }

  return (
    <>
      <nav>
        <div className="full-nav">
          <div className="left-nav">
            <h2>Digital Super Mall</h2>
          </div>
          <div className="right-nav">
            <ul>
              <Link to='/'><li>Home</li></Link>
              <Link to='/about'><li>About</li></Link>
              <Link to='/shops'><li>Shops</li></Link>
              <Link to='/products'><li>Products</li></Link>
              <Link to='/contact'><li>Contact us</li></Link>
            </ul>
            <div className="btns">
              <div className="l-btn" onClick={()=>{nav('/user/login')}}>Login</div>
              <div className="r-btn" onClick={()=>{nav('/user/register')}}>Register</div>
            </div>
          </div>
          <div className="bgr" onClick={handleBgr}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
