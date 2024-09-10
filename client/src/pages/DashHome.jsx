import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import './styles/DashHome.css';
import { checkAdmin } from '../utils/setValues';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DashHome = ({handleAlert}) => {
  const [shop, setShop] = useState({
    shopName: "",
    category: "",
    floor: "",
    shopDesc: ""
  });
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

  const handleShopChange = (e)=>{
    setShop({
      ...shop,
      [e.target.name]: e.target.value
    })
  }

  const handleShopSubmit = async(e)=>{
    e.preventDefault();
    const res = await axios.post('http://localhost:9000/api/admin/create-shop',{...shop}, {withCredentials: true});
    if(res.data.success){
      console.log(res.data);
      nav('/admin/dashboard/shops')
      handleAlert(res.data.message);
    }else{
      handleAlert(res.data.message);
    }
  }

  return (
    <>
      <div className="full-dh">
        <Sidebar />
        <div className="dh-remain">
          <div className="u-dash">
            <h1>Super Mall Dashboard</h1>
          </div>
          <div className="l-dash">
            <div className="ll-dash">
              <div className="d-card">
                <h3>Total Shops</h3>
                <p>5</p>
              </div>
              <div className="d-card">
                <h3>All Products</h3>
                <p>10</p>
              </div>
              <div className="d-card">
                <h3>All Offers</h3>
                <p>2</p>
              </div>
              <div className="d-card">
                <h3>Total Orders</h3>
                <p>20</p>
              </div>
            </div>
            <div className="lr-dash">
              <div className="img-ctrl">
              <img src="https://static.vecteezy.com/system/resources/thumbnails/021/666/136/small_2x/3d-data-analytics-dashboard-and-business-finance-report-online-marketing-financial-report-chart-data-analysis-and-web-development-concept-3d-illustration-png.png" alt="" />
              </div>
              <div className="d-btns">
                <div className="as-btn" onClick={()=>{
                  document.querySelector('.as-popup').style.display = 'flex';
                }}>Add Shop</div>
                <div className="ap-btn" onClick={()=>{
                  nav('/admin/dashboard/products');
                }}>Add Product</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="as-popup">
        <div className="as-popup-card">
          <h2>Add New Shop</h2>
          <form onSubmit={handleShopSubmit}>
            <input type="text" name='shopName' placeholder='Enter Shop name' value={shop.shopName} onChange={handleShopChange} />
            <select name="category" value={shop.category} onChange={handleShopChange} id="category">
              <option> Not Selected</option>
              <option value="general"> General Store</option>
              <option value="gaming"> Gaming Store</option>
              <option value="electronic"> Electronic Store</option>
              <option value="clothing"> Clothing Store</option>
            </select>
            <select name="floor" value={shop.floor} onChange={handleShopChange} id="floor">
              <option> Not Selected</option>
              <option value="ground"> Ground Floor</option>
              <option value="first"> 1st Floor</option>
              <option value="second"> 2nd Floor</option>
              <option value="third"> 3rd Floor</option>
              <option value="fourth"> 4th Floor</option>
            </select>
            <textarea name="shopDesc" id="shopDesc" rows={15} cols={40} placeholder='Write something about the Shop'value={shop.shopDesc} onChange={handleShopChange} ></textarea>
            <input type="submit" value='Add Shop' />
          </form>
          <div className="close" onClick={()=>{
            document.querySelector('.as-popup').style.display = 'none';
          }}>X</div>
        </div>
      </div>
    </>
  );
}

export default DashHome;
