import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import './styles/ManageCat.css';

const ManageCat = ({ handleAlert }) => {
  const [categories, setCategories] = useState(null);
  const [catName, setCatName] = useState("");
  const [catId, setCatId] = useState(null);

  useEffect(() => {
    getCat();
  }, [])

  const getCat = async () => {
    const res = await axios.get('http://localhost:9000/api/category/all-categories');
    if (res.data.success) {
      setCategories(res.data.categories);
    }
  }

  const handleCategoryChange = (e) => {
    setCatName(e.target.value);
  }

  const handleCategorySubmit = async(e) => {
    e.preventDefault();
    const res = await axios.post(`http://localhost:9000/api/category/create-category/${catName.toLowerCase()}`, {}, {withCredentials: true});
    if(res.data.success){
      setCategories((prevCat)=> [...prevCat, res.data.newCat]);
      handleAlert(res.data.message);
      document.querySelector('.ap-popup').style.display = 'none';
    }else{
      handleAlert(res.data.message);
    }
  }

  const handleCategoryUpdate = async(e)=>{
    e.preventDefault();
    const res = await axios.put(`http://localhost:9000/api/category/update-category/${catId}`, {catName}, {withCredentials: true});
    if(res.data.success){
      handleAlert(res.data.message);
      console.log(res.data.cat);
      setCategories(prevCat => prevCat.map((cat)=> cat._id === res.data.cat._id ? res.data.cat : cat));
      document.querySelector('.us-popup').style.display = 'none';
    }else{
      handleAlert(res.data.message);
    }
  }

  return (
    <>
      <div className="full-m-cat">
        <Sidebar />
        <div className="s-sidecontent">
          <div className="all-cats">
            <div>
              <h2>All Categories</h2>
              <div className="a-btn" onClick={() => {
                document.querySelector('.ap-popup').style.display = 'flex';
              }}>Add Category</div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>S no.</th>
                  <th>Category name</th>
                  <th>No.of Shops</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  categories?.length > 0 ? (
                    categories.map((cat, index) => (
                      <tr key={cat._id}>
                        <td>{index + 1}</td>
                        <td>{cat.catName}</td>
                        <td>{cat.shops.length}</td>
                        <td>
                          <div className="t-btns">
                            <div className="u-btn"onClick={()=>{
                              setCatId(cat._id);
                              document.querySelector('.us-popup').style.display = 'flex';
                            }}>Update Category</div>
                            <div className="d-btn" onClick={async () => {
                              const res = await axios.delete(`http://localhost:9000/api/category/delete-category/${cat._id}`, {withCredentials: true});
                              if (res.data.success) {
                                setCategories(prevCat => prevCat.filter((cat)=> cat._id!== res.data.deleted._id));
                                handleAlert(res.data.message);
                              } else {
                                handleAlert(res.data.message);
                              }
                            }}>Delete Category</div>
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

      <div className="ap-popup">
        <div className="ap-popup-card">
          <h2>Add new Category</h2>
          <form onSubmit={handleCategorySubmit}>
            <input type="text" name='catName' placeholder='Enter Category name' value={catName} onChange={handleCategoryChange} />
            <input type="submit" value='Add Category' />
          </form>
          <div className="close" onClick={() => {
            document.querySelector('.ap-popup').style.display = 'none';
          }}>X</div>
        </div>
      </div>

      <div className="us-popup">
        <div className="us-popup-card">
          <h2>Update Category</h2>
          <form onSubmit={handleCategoryUpdate}>
            <input type="text" name='catName' placeholder='Enter Category name' value={catName} onChange={handleCategoryChange} />
            <input type="submit" value='Add Category' />
          </form>
          <div className="close" onClick={() => {
            document.querySelector('.us-popup').style.display = 'none';
          }}>X</div>
        </div>
      </div>
    </>
  );
}

export default ManageCat;
