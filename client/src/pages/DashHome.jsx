import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import './styles/DashHome.css';
import { checkAdmin } from '../utils/setValues';
import { useNavigate } from 'react-router-dom';

const DashHome = () => {
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashHome;
