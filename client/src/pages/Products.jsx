import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { checkAdmin } from '../utils/setValues';

const Products = ({user}) => {
  const nav = useNavigate();

  useEffect(()=>{
    if(!user){
      nav('/');
    }
  },[])

  return (
    <>
      <div className="full-products">
        <Sidebar />
      </div>
    </>
  );
}

export default Products;
