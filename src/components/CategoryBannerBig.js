import React, { useEffect, useState } from 'react';
import { fetchRecipeCusineTypes } from '../services/recipeApi';
import RecipeCardLong from './RecipeCardLong';
import './CategoryBannerBig.css';

const CategoryBannerBig = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchRecipeCusineTypes();
      setCategories(data.slice(0, 4)); // Use first 4 cuisines
    };
    getCategories();
  }, []);

  return (
    <div className="category-banner-big">
      {categories.map((cat, idx) => (
        <RecipeCardLong key={cat.name} image={cat.image} label={cat.name.toUpperCase()} />
      ))}
    </div>
  );
};

export default CategoryBannerBig;
