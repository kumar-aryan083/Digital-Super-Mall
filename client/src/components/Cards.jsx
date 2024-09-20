import React, { useEffect, useState } from 'react';
import './styles/Cards.css';
import axios from 'axios';
import ShopCard from './ShopCard';

const Cards = ({cardsContainerRef, catName}) => {
  const [shops, setShops] = useState(null);

  useEffect(()=>{
    // console.log(catName.toLowerCase());
    getShops();
  }, [])

  const getShops = async()=>{
    const res = await axios.get(`http://localhost:9000/api/category/all-shops/${catName.toLowerCase()}`);
    if(res.data.success){
      // console.log(res.data);
      setShops(res.data.shops);
    }
  }

  return (
    <>
      <div className="all-cards" ref={cardsContainerRef}>  
          <ShopCard shops={shops} />
      </div>
    </>
  );
}

export default Cards;
