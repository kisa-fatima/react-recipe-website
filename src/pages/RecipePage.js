import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeById } from '../services/recipeApi';
import '../styles/RecipePage.css';
import { FaBowlFood } from 'react-icons/fa6';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      setLoading(true);
      fetchRecipeById(id).then(data => {
        setRecipe(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <div className="recipe-page-loading">Loading...</div>;
  if (!recipe) return <div className="recipe-page-error">Recipe not found.</div>;

  // Ensure rating is a valid number between 0 and 5
  let safeRating = Number(recipe.rating);
  if (isNaN(safeRating) || safeRating < 0) safeRating = 0;
  if (safeRating > 5) safeRating = 5;
  const fullStars = Math.floor(safeRating);
  const halfStar = safeRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="recipe-page-container">
      <h2 className="recipe-page-title">{recipe.name}</h2>
      <img src={recipe.image} alt={recipe.name} className="recipe-page-image" />
      <div className="recipe-page-rating-row">
        <span className="recipe-card-rating">
          {Array(fullStars).fill().map((_, i) => (
            <span key={i} className="star full">★</span>
          ))}
          {halfStar && <span className="star half">★</span>}
          {Array(emptyStars).fill().map((_, i) => (
            <span key={i + fullStars + 1} className="star empty">☆</span>
          ))}
        </span>
      </div>
      <div className="recipe-page-rating-value-centered">
        {recipe.reviewCount ? `${recipe.reviewCount} REVIEWS / ${safeRating.toFixed(1)} AVERAGE` : `${safeRating.toFixed(1)} AVERAGE`}
      </div>
      <div className="recipe-page-details">
        <p><strong>
          {/* Cuisine Icon */}
          <span className="recipe-page-icon" style={{marginRight: '0.4em', verticalAlign: 'middle'}}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9" stroke="#edb654" strokeWidth="2"/><path d="M6 10c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" fill="#edb654"/></svg>
          </span>
          Cuisine:
        </strong> {recipe.cuisine}</p>
        <p><strong>
          {/* Ingredients Icon */}
          <span className="recipe-page-icon" style={{marginRight: '0.4em', verticalAlign: 'middle'}}>
            <FaBowlFood size={20} color="#edb654" />
          </span>
          Ingredients:
        </strong></p>
        <ul>
          {recipe.ingredients && recipe.ingredients.map((ing, idx) => (
            <li key={idx}>{ing}</li>
          ))}
        </ul>
        <p><strong>
          {/* Instructions Icon */}
          <span className="recipe-page-icon" style={{marginRight: '0.4em', verticalAlign: 'middle'}}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="14" height="12" rx="2" fill="#edb654" />
              <rect x="6" y="7" width="8" height="2" rx="1" fill="#fff" />
              <rect x="6" y="11" width="5" height="2" rx="1" fill="#fff" />
            </svg>
          </span>
          Instructions:
        </strong></p>
        <ol>
          {recipe.instructions && recipe.instructions.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipePage;
