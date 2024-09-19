import React from 'react';
import './styles/ShopCard.css';

const ShopCard = ({ shops }) => {

  const truncateText = (text, maxLength)=>{
    return text.length>maxLength ? text.substring(0, maxLength) : text;
  }

  return (
    <>
      {
        shops?.length > 0 ? (
          <>
            {
              shops.map((shop) => (
                <>
                  <div className="cards" key={shop._id} >
                    <div className="cards-info">
                      <h3>{shop.shopName}</h3>
                      <p>{truncateText(shop.shopDesc, 20)}...</p>
                    </div>
                    <div className="rm-btn">
                      Go to Shop
                    </div>
                  </div>
                </>
              ))
            }
          </>
        ) : (
          <>
            No shops to show
          </>
        )
      }

    </>
  );
}

export default ShopCard;
