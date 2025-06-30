import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { filterRecipesByCuisine } from '../services/recipeApi';
import RecipeCard from '../components/RecipeCard';
import '../styles/CategoryWise.css';

const CategoryWise = () => {
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    filterRecipesByCuisine(category).then(data => {
      setRecipes(data);
      setLoading(false);
    });
  }, [category]);

  return (
    <div className="category-wise-page">
      <h2 className="category-wise-title">{category} Recipes</h2>
      {loading ? (
        <div className="category-wise-loading">Loading...</div>
      ) : recipes.length === 0 ? (
        <div className="category-wise-empty">No recipes found for this category.</div>
      ) : (
        <div className="category-wise-cards">
          {recipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              image={recipe.image}
              label={recipe.name}
              rating={recipe.rating}
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryWise;
