import React, { useEffect, useState } from 'react';
import { BookOutlined, GlobalOutlined } from '@ant-design/icons';
import { fetchAllRecipes } from '../services/recipeApi';
import { cuisinesData } from '../utils/cusinesData';
import CusinesChart from '../components/CusinesChart';
import CusinesPieChart from '../components/CusinesPieChart';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [totalCuisines, setTotalCuisines] = useState(0);

  useEffect(() => {
    // Fetch total recipes
    fetchAllRecipes(1000, 0).then(recipes => {
      setTotalRecipes(recipes.length);
    });
    // Get total cuisines
    setTotalCuisines(cuisinesData.length);
  }, []);

  return (
    <div className="admin-dashboard">
      <h1 className="admin-dashboard-title">Admin Dashboard</h1>
      <div className="admin-dashboard-grid">
        <div className="admin-dashboard-widget grid-item grid-item-1-1">
          <div className="widget-icon" style={{ background: 'var(--primary-color)' }}>
            <BookOutlined style={{ fontSize: 24, color: '#fff' }} />
          </div>
          <div className="widget-info">
            <div className="widget-label">Total Recipes</div>
            <div className="widget-value">{totalRecipes}</div>
          </div>
        </div>
        <div className="admin-dashboard-widget grid-item grid-item-1-2">
          <div className="widget-icon" style={{ background: 'var(--secondary-color, #ff7f50)' }}>
            <GlobalOutlined style={{ fontSize: 24, color: '#fff' }} />
          </div>
          <div className="widget-info">
            <div className="widget-label">Total Cuisines</div>
            <div className="widget-value">{totalCuisines}</div>
          </div>
        </div>
        <div className="grid-item grid-item-2-1">
          <CusinesChart />
        </div>
        <div className="grid-item grid-item-2-2">
          <CusinesPieChart />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;