import React from 'react';
import './styles/Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <>
      <div className="full-sidebar">
        <ul>
            <Link to='/admin/dashboard'><li>Home</li></Link>
            <Link to='/admin/dashboard/shops'><li>Shops</li></Link>
            <Link to='/admin/dashboard/products'><li>Products</li></Link>
            <Link to='/admin/dashboard/manage-category'><li>Manage Categories</li></Link>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
