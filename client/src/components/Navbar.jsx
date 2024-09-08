import React, { useEffect } from 'react';
import './styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Navbar = ({ user, onLogout, alert, handleAlert }) => {
  const nav = useNavigate();
  const notify = () => toast(alert);

  const handleBgr = () => {
    if (document.querySelector('.right-nav').style.left === "-100%") {
      document.querySelector('.right-nav').style.left = "0"
    } else {
      document.querySelector('.right-nav').style.left = "-100%"
    }
  }

  useEffect(()=>{
    if(alert){
      notify(alert);
    }
  },[alert])

  return (
    <>
      <nav>
        <div className="full-nav">
          <div className="left-nav">
            <h2>Digital Super Mall</h2>
          </div>
          <div className="right-nav">
            <ul>
              <Link to='/' onClick={handleBgr}><li>Home</li></Link>
              <Link to='/about' onClick={handleBgr}><li>About</li></Link>
              <Link to='/shops' onClick={handleBgr}><li>Shops</li></Link>
              <Link to='/products' onClick={handleBgr}><li>Products</li></Link>
              <Link to='/contact' onClick={handleBgr}><li>Contact us</li></Link>
            </ul>
            <div className="btns">
              {user &&
                <>
                  <div className="l-btn" onClick={() => { 
                    handleAlert("Clicked on profile");
                   }}>Profile</div>
                  <div className="r-btn" onClick={async() => {
                    const res = await axios.post('http://localhost:9000/api/common/logout',{},{withCredentials: true});
                    if(res.data.success){
                      localStorage.removeItem('user');
                      onLogout();
                      handleAlert(res.data.message);
                    } 
                    document.querySelector('.right-nav').style.left = "-100%";
                  }}>Logout</div>
                </>
              }
              {!user &&
                <>
                  <div className="l-btn" onClick={() => {
                    nav('/user/login');
                    document.querySelector('.right-nav').style.left = "-100%"
                    }}>Login</div>
                  <div className="r-btn" onClick={() => { 
                    nav('/user/register');
                    document.querySelector('.right-nav').style.left = "-100%"
                  }}>Register</div>
                </>
              }
            </div>
          </div>
          <div className="bgr" onClick={handleBgr}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
      </nav>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default Navbar;
