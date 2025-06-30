import React from 'react';
import '../styles/RecipeCard.css';

const RecipeCard = ({ image, label, rating, reviewCount, onClick }) => {
  // Ensure rating is a valid number between 0 and 5
  let safeRating = Number(rating);
  if (isNaN(safeRating) || safeRating < 0) safeRating = 0;
  if (safeRating > 5) safeRating = 5;

  const fullStars = Math.floor(safeRating);
  const halfStar = safeRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="recipe-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className="recipe-card-img-wrapper">
        <img src={image} alt={label} className="recipe-card-img" />
      </div>
      <div className="recipe-card-rating">
        {Array(fullStars).fill().map((_, i) => (
          <span key={i} className="star full">★</span>
        ))}
        {halfStar && <span className="star half">★</span>}
        {Array(emptyStars).fill().map((_, i) => (
          <span key={i + fullStars + 1} className="star empty">☆</span>
        ))}
      </div>
      <div className="recipe-card-reviews">
        {reviewCount ? `${reviewCount} REVIEWS / ${safeRating.toFixed(1)} AVERAGE` : `${safeRating.toFixed(1)} AVERAGE`}
      </div>
      <div className="recipe-card-label">{label}</div>
    </div>
  );
};

export default RecipeCard;
