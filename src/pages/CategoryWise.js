import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { filterRecipesByCuisine } from '../services/recipeApi';
import RecipeCard from '../components/RecipeCard';
import '../styles/CategoryWise.css';
import Loader from '../components/Loader';
import { cuisinesData } from '../utils/cusinesData';

const CategoryWise = () => {
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cuisineDescription, setCuisineDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    filterRecipesByCuisine(category).then(data => {
      setRecipes(data);
      setLoading(false);
    });
    // Find cuisine description
    const cuisine = cuisinesData.find(c => c.name.toLowerCase() === category.toLowerCase());
    setCuisineDescription(cuisine ? cuisine.description : '');
  }, [category]);

  return (
    <div className="category-wise-page">
      <h2 className="category-wise-title">{category} Recipes</h2>
      {cuisineDescription && (
        <div className="category-wise-description">{cuisineDescription}</div>
      )}
      {loading ? (
        <Loader />
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
              reviewCount={recipe.reviewCount}
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryWise;
