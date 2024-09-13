import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import './styles/Shops.css'
import axios from 'axios';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';
// import { Editor } from '@tinymce/tinymce-react';

const Shops = ({ user, handleAlert }) => {
  const nav = useNavigate();
  // const editorRef = useRef(null);
  const imageRef = useRef(null);
  const [shops, setShops] = useState(null);
  const [id, setId] = useState(null);
  const [imgPerc, setImgPerc] = useState("");
  const [uploading, setUploading] = useState(false);
  const [shop, setShop] = useState({
    shopName: "",
    category: "",
    floor: "",
    shopDesc: ""
  });
  const [product, setProduct] = useState({
    productName: "",
    mrp: "",
    specs: "",
    quantity: "",
    offerPerc: "",
    productImg: ""
  });

  useEffect(() => {
    if (!user) {
      nav('/');
    }
    getData();
  }, [])

  useEffect(() => {
    if (imgPerc === 100) {
        setUploading(false);
    } else if (imgPerc > 0) {
        setUploading(true);
    }
}, [imgPerc]);

  const getData = async () => {
    const res = await axios.get('http://localhost:9000/api/admin/all-shops', { withCredentials: true });
    if (res.data.success) {
      setShops(res.data.allShops);
    }
  }

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  }

  const handleShopChange = (e) => {
    setShop({
      ...shop,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.put('http://localhost:9000/api/admin/update-shop', { ...shop }, { withCredentials: true })
    if (res.data.success) {
      setShops(res.data.allShops);
      handleAlert(res.data.message);
      document.querySelector('.us-popup').style.display = 'none';
    }
  }

  const handleAddProduct = async (e) => {
    e.preventDefault();
    // console.log(product);
    const res = await axios.post(`http://localhost:9000/api/admin/create-product/${id}`, { ...product }, { withCredentials: true });
    if (res.data.success) {
      console.log(res.data);
      handleAlert(res.data.message);
      document.querySelector('.ap-popup').style.display = 'none';
      nav('/admin/dashboard/products');
    }
  }

  const handleProductChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
  }

  const handleImageUpload = () => {
    const file = imageRef.current.files[0];
    if (!file) {
      showAlert('Please select an image file.');
      return;
    }

    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}_${file.name}`;
    const storageRef = ref(storage, `productImage/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPerc(Math.round(progress));
      },
      (error) => {
        console.error('Upload failed:', error);
        handleAlert('Image upload failed. Please try again.');
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct((prevProduct) => ({
            ...prevProduct,
            productImg: downloadURL
          }))
        });
      }
    );
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
                            <div className="u-btn" onClick={() => {
                              document.querySelector('.us-popup').style.display = 'flex';
                              setShop(shop);
                            }}>Update Shop</div>
                            <div className="d-btn" onClick={async () => {
                              const res = await axios.delete(`http://localhost:9000/api/admin/delete-shop/${shop._id}`, { withCredentials: true });
                              if (res.data.success) {
                                setShops(res.data.allShops);
                              }
                            }}>Delete Shop</div>
                            <div className="a-btn" onClick={() => {
                              document.querySelector('.ap-popup').style.display = 'flex';
                              setId(shop._id);
                            }}>Add Product</div>
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

      <div className="us-popup">
        <div className="us-popup-card">
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
            <textarea name="shopDesc" id="shopDesc" rows={15} cols={40} placeholder='Write something about the Shop' value={shop.shopDesc} onChange={handleShopChange} ></textarea>
            <input type="submit" value='Update Shop' />
          </form>
          <div className="close" onClick={() => {
            document.querySelector('.us-popup').style.display = 'none';
          }}>X</div>
        </div>
      </div>

      <div className="ap-popup">
        <div className="ap-popup-card">
          <h2>Add new product</h2>
          <form onSubmit={handleAddProduct}>
            <input type="text" name='productName' placeholder='Enter Product name' value={product.productName} onChange={handleProductChange} />
            <input type="number" name='mrp' placeholder='Enter Product MRP' value={product.mrp} onChange={handleProductChange} />
            <input type="number" name='offerPerc' placeholder='Enter Product Offer' value={product.offerPerc} onChange={handleProductChange} />
            <input type="number" name='quantity' placeholder='Enter Product quantity' value={product.quantity} onChange={handleProductChange} />
            <div className="img-inpt">
              <input type="file"
                accept=".jpg,.jpeg,.png,.gif,.webp,.avif"
                ref={imageRef}
                id="image"
                onChange={handleImageUpload}
                required />

              <p className='showUploading' style={{ display: uploading ? 'block' : 'none' }}>Uploading: {imgPerc}%</p>
              <p className='showUploaded' style={{ display: imgPerc === 100 ? 'block' : 'none' }}>Uploaded: {imgPerc}%</p>
            </div>
            <textarea name="specs" id="specs" rows={15} cols={60} placeholder='Enter the specications of the product' value={product.specs} onChange={handleProductChange}></textarea>
            {/* <Editor
                    apiKey="guno0a8sli5ntftah9gajp399fnwk8ov8f4kud5pdk9sdnmd"
                    onInit={(evt, editor) => editorRef.current = editor}
                    init={{
                        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                    }}
                    initialValue="Remove this and enter product specification"
                /> */}
            <input type="submit" value='Add product' />
          </form>
          <div className="close" onClick={() => {
            document.querySelector('.ap-popup').style.display = 'none';
          }}>X</div>
        </div>
      </div>
    </>
  );
}

export default Shops;
