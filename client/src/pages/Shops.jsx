import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import './styles/Shops.css'
import axios from 'axios';

const Shops = ({ user, handleAlert }) => {
  const [shops, setShops] = useState(null);
  const [shop, setShop] = useState({
    shopName: "",
    category: "",
    floor: "",
    shopDesc: ""
  });
  
  const nav = useNavigate();

  useEffect(() => {
    if (!user) {
      nav('/');
    }
    getData();
  }, [])

  const getData = async () => {
    const res = await axios.get('http://localhost:9000/api/admin/all-shops', { withCredentials: true });
    if (res.data.success) {
      setShops(res.data.allShops);
    }
  }

  const truncateText = (text, maxLength) =>{
    return text.length>maxLength ? `${text.substring(0, maxLength)}...` : text;
  }

  const handleShopChange = (e)=>{
    setShop({
      ...shop,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdateSubmit = async(e)=>{
    e.preventDefault();
    const res = await axios.post('http://localhost:9000/api/admin/update-shop', {...shop}, {withCredentials: true})
    if(res.data.success){
      setShops(res.data.allShops);
      handleAlert(res.data.message);
      document.querySelector('.as-popup').style.display = 'none';
    }
  }

  return (
    <>
      <div className="full-shops">
        <Sidebar />
        <div className="s-sidecontent">
          <div className="all-shops">
            <h2>All Shops</h2>
            <table>
              <thead>
                <tr>
                  <th>S no.</th>
                  <th>Shop name</th>
                  <th>Category</th>
                  <th>Shop Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  shops?.length > 0 ? (
                    shops.map((shop) => (
                      <tr key={shop._id}>
                        <td>{shop.shopNumber}</td>
                        <td>{shop.shopName}</td>
                        <td>{shop.category}</td>
                        <td>{truncateText(shop.shopDesc, 50)}</td>
                        <td>
                          <div className="t-btns">
                            <div className="u-btn" onClick={()=>{
                              document.querySelector('.as-popup').style.display = 'flex';
                              setShop(shop);
                            }}>Update Shop</div>
                            <div className="d-btn" onClick={async()=>{
                              const res = await axios.delete(`http://localhost:9000/api/admin/delete-shop/${shop._id}`, {withCredentials: true});
                              if(res.data.success){
                                setShops(res.data.allShops);
                              }
                            }}>Delete Shop</div>
                            <div className="a-btn">Add Product</div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>There are no shops to show</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="as-popup">
        <div className="as-popup-card">
          <h2>Update Shop</h2>
          <form onSubmit={handleUpdateSubmit}>
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
            <input type="submit" value='Update Shop' />
          </form>
          <div className="close" onClick={()=>{
            document.querySelector('.as-popup').style.display = 'none';
          }}>X</div>
        </div>
      </div>
    </>
  );
}

export default Shops;
