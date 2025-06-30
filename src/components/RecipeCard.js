import React from 'react';
import '../styles/RecipeCardLong.css';

const RecipeCard = ({ image, label }) => {
  return (
    <div className="recipe-card-long">
      <div className="recipe-card-long-img-wrapper">
        <img
          src={image}
          alt={label}
          className="recipe-card-long-img"
          style={{ height: '220px' }}
        />
        <div className="recipe-card-long-label">{label}</div>
      </div>
    </div>
  );
};

export default RecipeCard;
