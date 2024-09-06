import React from 'react';
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

const App = () => {
  return (
    <>
      <Navbar />
      <div className="main-app">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/About' element={<About />} />
          <Route path='/Shops' element={<Shops />} />
          <Route path='/products' element={<Products />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/admin/register' element={<AdminRegister />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/user/register' element={<UserRegister />} />
          <Route path='/user/login' element={<UserLogin />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
