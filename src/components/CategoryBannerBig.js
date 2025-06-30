import React, { useEffect, useState } from 'react';
import { fetchRecipeCusineTypes } from '../services/recipeApi';
import RecipeCardLong from './RecipeCardLong';
import '../styles/CategoryBannerBig.css';
import { useNavigate } from 'react-router-dom';

const CategoryBannerBig = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchRecipeCusineTypes();
      setCategories(data.slice(0, 4)); // Use first 4 cuisines
    };
    getCategories();
  }, []);

  const handleClick = (cat) => {
    navigate(`/category/${encodeURIComponent(cat.name)}`);
  };

  return (
    <div className="category-banner-big">
      {categories.map((cat, idx) => (
        <div key={cat.name} onClick={() => handleClick(cat)} style={{ cursor: 'pointer' }}>
          <RecipeCardLong image={cat.image} label={cat.name.toUpperCase()} />
        </div>
      ))}
    </div>
  );
};

export default CategoryBannerBig;
