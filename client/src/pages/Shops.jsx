import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { checkAdmin } from '../utils/setValues';

const Shops = () => {
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
      <div className="full-shops">
        <Sidebar />
      </div>
    </>
  );
}

export default Shops;
