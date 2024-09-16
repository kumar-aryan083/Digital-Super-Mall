import React from 'react';
import './styles/Cards.css';

const Cards = ({cardsContainerRef}) => {

  return (
    <>
      <div className="all-cards" ref={cardsContainerRef}>  
            <div className="cards">
              <div className="cards-info">
              <h3>Shop Name</h3>
              <p>Shop description</p>
              </div>
              <div className="rm-btn">
                Go to Shop
              </div>
            </div>
            <div className="cards">
              <div className="cards-info">
              <h3>Shop Name</h3>
              <p>Shop description</p>
              </div>
              <div className="rm-btn">
                Go to Shop
              </div>
            </div>
            <div className="cards">
              <div className="cards-info">
              <h3>Shop Name</h3>
              <p>Shop description</p>
              </div>
              <div className="rm-btn">
                Go to Shop
              </div>
            </div>
            <div className="cards">
              <div className="cards-info">
              <h3>Shop Name</h3>
              <p>Shop description</p>
              </div>
              <div className="rm-btn">
                Go to Shop
              </div>
            </div>
            <div className="cards">
              <div className="cards-info">
              <h3>Shop Name</h3>
              <p>Shop description</p>
              </div>
              <div className="rm-btn">
                Go to Shop
              </div>
            </div>
            <div className="cards">
              <div className="cards-info">
              <h3>Shop Name</h3>
              <p>Shop description</p>
              </div>
              <div className="rm-btn">
                Go to Shop
              </div>
            </div>
            <div className="cards">
              <div className="cards-info">
              <h3>Shop Name</h3>
              <p>Shop description</p>
              </div>
              <div className="rm-btn">
                Go to Shop
              </div>
            </div>
            <div className="cards">
              <div className="cards-info">
              <h3>Shop Name</h3>
              <p>Shop description</p>
              </div>
              <div className="rm-btn">
                Go to Shop
              </div>
            </div>
          </div>
    </>
  );
}

export default Cards;
