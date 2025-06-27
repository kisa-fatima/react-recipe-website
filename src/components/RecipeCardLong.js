import React from 'react';
import './RecipeCardLong.css';

const RecipeCardLong = ({ image, label }) => {
  return (
    <div className="recipe-card-long">
      <div className="recipe-card-long-img-wrapper">
        <img src={image} alt={label} className="recipe-card-long-img" />
        <div className="recipe-card-long-label">{label}</div>
      </div>
    </div>
  );
};

export default RecipeCardLong;
