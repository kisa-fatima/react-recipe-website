import React, { useState, useEffect } from 'react';
import { filterRecipesByMealType } from '../services/recipeApi';
import RecipeCard from './RecipeCard';
import '../styles/SelectSection.css';

const MEAL_TYPES = [
  { label: 'BREAKFAST', value: 'breakfast' },
  { label: 'LUNCH', value: 'lunch' },
  { label: 'DINNER', value: 'dinner' },
];

const SelectSection = () => {
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    filterRecipesByMealType(selectedMeal).then(data => {
      setRecipes(data.slice(0, 4));
      setLoading(false);
    });
  }, [selectedMeal]);

  return (
    <div className="select-section">
      <div className="select-section-tabs">
        {MEAL_TYPES.map(meal => (
          <button
            key={meal.value}
            className={`select-section-tab${selectedMeal === meal.value ? ' selected' : ''}`}
            onClick={() => setSelectedMeal(meal.value)}
          >
            {meal.label}
          </button>
        ))}
      </div>
      <div className="select-section-cards">
        {loading ? (
          <div className="select-section-loading">Loading...</div>
        ) : (
          recipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              image={recipe.image}
              label={recipe.name}
              rating={recipe.rating}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default SelectSection;
