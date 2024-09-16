import React, { useRef } from 'react';
import './styles/HomeComponent.css';
import Cards from './Cards';

const HomeComponent = () => {
  const cardsContainerRef = useRef(null); // Reference for the cards container

  const scrollLeft = () => {
    cardsContainerRef.current.scrollBy({
      left: -330, // Scrolls 100px to the left
      behavior: 'smooth' // Smooth scrolling
    });
  };

  const scrollRight = () => {
    cardsContainerRef.current.scrollBy({
      left: 330, // Scrolls 100px to the right
      behavior: 'smooth' // Smooth scrolling
    });
  };

  return (
    <>
      <div className="f-home">
        <div className="u-home">
          <h1>Welcome to Aryan's Digital Super Mall</h1>
          <p>Explore the Feel of visiting super mall at home. This mall has vast range of shops, Please visit and find whatever you need at one place.</p>
        </div>
        <div className="l-home">
          <div className="top-bar">
            <div className="catName">
              Electronics
            </div>
            <div className="h-line"></div>
            <div className="c-btns">
              <div className="left-btn" onClick={scrollLeft}>
                <i class="fa-solid fa-arrow-left"></i>
              </div>
              <div className="right-btn" onClick={scrollRight}>
                <i class="fa-solid fa-arrow-right"></i>
              </div>
            </div>
          </div>
          <Cards cardsContainerRef={cardsContainerRef} />
        </div>
      </div>
    </>
  );
}

export default HomeComponent;
