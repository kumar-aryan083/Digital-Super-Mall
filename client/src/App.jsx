import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Shops from './pages/Shops';
import Products from './pages/Products';
import Contact from './pages/Contact';
import AdminRegister from './pages/AdminRegister';
import AdminLogin from './pages/AdminLogin';
import UserRegister from './pages/UserRegister';
import UserLogin from './pages/UserLogin';
import DashHome from './pages/DashHome';
import ManageCat from './components/ManageCat';

const App = () => {
  const [user, setUser] = useState(()=>{
    const luser = localStorage.getItem('user');
    return luser ? JSON.parse(luser): null;
  })
  const [alert, setAlert] = useState("");

  const settingUser = ()=>{
    setUser(JSON.parse(localStorage.getItem('user')));
  }
  const handleLogout = ()=>{
    setUser(null);
  }
  const settingAlert = (msg)=>{
    setAlert(msg);
  }

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} alert={alert} handleAlert={settingAlert} />
      <div className="main-app">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/About' element={<About />} />
          <Route path='/Shops' element={<Shops />} />
          <Route path='/products' element={<Products />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/admin/register' element={<AdminRegister handleAlert={settingAlert} user={user} />} />
          <Route path='/admin/login' element={<AdminLogin onLogin={settingUser} handleAlert={settingAlert} user={user} />} />
          {/* <Route path='/user/register' element={<UserRegister handleAlert={settingAlert} user={user} />} />
          <Route path='/user/login' element={<UserLogin handleAlert={settingAlert} onLogin={settingUser} user={user}/>} /> */}
          <Route path='/admin/dashboard' element={<DashHome handleAlert={settingAlert} user={user} />} />
          <Route path='/admin/dashboard/shops' element={<Shops user={user} handleAlert={settingAlert} />} />
          <Route path='/admin/dashboard/products' element={<Products user={user} handleAlert={settingAlert} />} />
          <Route path='/admin/dashboard/manage-category' element={<ManageCat handleAlert={settingAlert}/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
