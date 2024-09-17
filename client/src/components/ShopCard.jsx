import React from 'react';
import './styles/ShopCard.css';

const ShopCard = () => {
  return (
    <>
      <div className="cards">
              <div className="cards-info">
              <h3>Shop Name</h3>
              <p>Shop description</p>
              </div>
              <div className="rm-btn">
                Go to Shop
              </div>
            </div>
    </>
  );
}

export default ShopCard;
