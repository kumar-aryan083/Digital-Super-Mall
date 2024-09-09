import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { checkAdmin } from '../utils/setValues';

const Products = () => {
  const nav = useNavigate();

  useEffect(()=>{
    findAdmin();
  },[])

  const findAdmin = async()=>{
    const isAdmin = await checkAdmin();
    if(!isAdmin){
      nav('/');
    }
  }

  return (
    <>
      <div className="full-products">
        <Sidebar />
      </div>
    </>
  );
}

export default Products;
