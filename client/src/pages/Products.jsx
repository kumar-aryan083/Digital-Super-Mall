import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/Products.css';

const Products = ({user, handleAlert}) => {
  const nav = useNavigate();
  const [products, setProducts] = useState(null);
  const [product, setProduct] = useState({
    productName: "",
    mrp: "",
    specs: "",
    quantity: "",
    offerPerc: "",
    productImg: ""
  });

  useEffect(()=>{
    if(!user){
      nav('/');
    }
    getData();
  },[]);

  const getData = async () => {
    const res = await axios.get('http://localhost:9000/api/admin/all-products');
    if (res.data.success) {
      setProducts(res.data.allProducts);
    }
  }

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  }

  const handleProductChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdateProduct = async(e)=>{
    e.preventDefault();
    const res = await axios.put('http://localhost:9000/api/admin/update-product', { ...product }, { withCredentials: true })
    if (res.data.success) {
      setProducts(res.data.allProducts);
      handleAlert(res.data.message);
      document.querySelector('.ap-popup').style.display = 'none';
    }
  }

  return (
    <>
      <div className="full-products">
        <Sidebar />
        <div className="s-sidecontent">
          <div className="all-products">
            <h2>All Products</h2>
            <table>
              <thead>
                <tr>
                  <th>S no.</th>
                  <th>Product name</th>
                  <th>Price</th>
                  <th>Product Description</th>
                  <th>Offer</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  products?.length > 0 ? (
                    products.map((product, index) => (
                      <tr key={product._id}>
                        <td>{index+1}</td>
                        <td>{product.productName}</td>
                        <td>{product.mrp}</td>
                        <td>{truncateText(product.specs, 50)}</td>
                        <td>{product.offerPerc}%</td>
                        <td>
                          <div className="t-btns">
                            <div className="u-btn" onClick={() => {
                              document.querySelector('.ap-popup').style.display = 'flex';
                              setProduct(product);
                            }}>Update Product</div>
                            <div className="d-btn" onClick={async () => {
                              const res = await axios.delete(`http://localhost:9000/api/admin/delete-product/${product._id}`, { withCredentials: true });
                              if (res.data.success) {
                                setProducts(res.data.allProducts);
                              }
                            }}>Delete Product</div>
                            <div className="a-btn" onClick={()=>{
                              setProduct(product);
                              document.querySelector('.sp-popup').style.display = 'flex';
                            }}>Show Product</div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>There are no Products to show</td>
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

      <div className="ap-popup">
        <div className="ap-popup-card">
          <h2>Update product</h2>
          <form onSubmit={handleUpdateProduct}>
            <input type="text" name='productName' placeholder='Enter Product name' value={product.productName} onChange={handleProductChange} />
            <input type="number" name='mrp' placeholder='Enter Product MRP' value={product.mrp} onChange={handleProductChange} />
            <input type="number" name='offerPerc' placeholder='Enter Product Offer' value={product.offerPerc} onChange={handleProductChange} />
            <input type="number" name='quantity' placeholder='Enter Product quantity' value={product.quantity} onChange={handleProductChange} />
            <textarea name="specs" id="specs" rows={15} cols={60} placeholder='Enter the specications of the product' value={product.specs} onChange={handleProductChange}></textarea>
            <input type="submit" value='Update product' />
          </form>
          <div className="close" onClick={() => {
            document.querySelector('.ap-popup').style.display = 'none';
          }}>X</div>
        </div>
      </div>

      <div className="sp-popup">
        <div className="sp-popup-card">
          <h2>{product.productName}</h2>
          <hr />
          <div>
            <div className="p-specs">
              <p>Specification:</p>
              <p>{product.specs}</p>
            </div>
            <p>Price: {product.mrp}</p>
            <p>Offer: {product.offerPerc}</p>
            <p>Quantity: {product.quantity}</p>
          </div>
        <div className="close" onClick={() => {
            document.querySelector('.sp-popup').style.display = 'none';
          }}>X</div>
        </div>
      </div>
    </>
  );
}

export default Products;
