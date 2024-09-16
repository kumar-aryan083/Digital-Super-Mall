import React, { useEffect, useRef, useState } from 'react';
import './styles/HomeComponent.css';
import Cards from './Cards';
import axios from 'axios';

const HomeComponent = () => {
  const cardsContainerRef = useRef([]); // Reference for the cards container
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    getCat();
  }, [])

  const getCat = async () => {
    const res = await axios.get("http://localhost:9000/api/category/all-categories");
    if (res.data.success) {
      setCategories(res.data.categories);
    }
  }

  const scrollLeft = (index) => {
    cardsContainerRef.current[index].scrollBy({
      left: -330, // Scrolls 100px to the left
      behavior: 'smooth' // Smooth scrolling
    });
  };

  const scrollRight = (index) => {
    cardsContainerRef.current[index].scrollBy({
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
          {
            categories?.length > 0 ? (
              <>
                {
                  categories.map((cat, index) => (
                    <div key={cat._id}>
                      <div className="top-bar" >
                        <div className="catName">
                          {cat?.catName}
                        </div>
                        <div className="h-line"></div>
                        <div className="c-btns">
                          <div className="left-btn" onClick={() => scrollLeft(index)}>
                            <i className="fa-solid fa-arrow-left"></i>
                          </div>
                          <div className="right-btn" onClick={() => scrollRight(index)}>
                            <i className="fa-solid fa-arrow-right"></i>
                          </div>
                        </div>
                      </div>
                      <Cards key={cat._id} cardsContainerRef={(el) => (cardsContainerRef.current[index] = el)} />
                    </div>
                  ))
                }
              </>
            ) : (
              <>
                <p>No Categories to show shop details</p>
              </>
            )
          }
        </div>
      </div>
    </>
  );
}

export default HomeComponent;
