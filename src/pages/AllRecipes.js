import React, { useEffect, useState } from 'react';
import { fetchAllRecipes } from '../services/recipeApi';
import RecipeCard from '../components/RecipeCard';
import '../styles/AllRecipes.css';
import { ScheduleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const RECIPES_PER_PAGE = 12;

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchAllRecipes(RECIPES_PER_PAGE, (page - 1) * RECIPES_PER_PAGE).then(data => {
      setRecipes(data);
      setLoading(false);
    });
    // Fetch total count if available from API
    fetch('https://dummyjson.com/recipes').then(res => res.json()).then(data => {
      setTotal(data.total || 0);
    });
  }, [page]);

  const totalPages = total ? Math.ceil(total / RECIPES_PER_PAGE) : 1;

  // Pagination logic for displaying page numbers with ellipsis
  const getPageButtons = () => {
    const buttons = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      if (page <= 3) {
        buttons.push(1, 2, 3, '...', totalPages);
      } else if (page >= totalPages - 2) {
        buttons.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        buttons.push(1, '...', page, '...', totalPages);
      }
    }
    return buttons;
  };

  return (
    <div className="all-recipes-page">
      <h2 className="all-recipes-title">
        <ScheduleOutlined style={{ color: '#edb654', fontSize: '2.1rem', verticalAlign: 'middle', marginRight: '0.5rem' }} />
        All Recipes
      </h2>
      {loading ? (
        <div className="all-recipes-loading">Loading...</div>
      ) : (
        <>
          <div className="all-recipes-cards">
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
          <div className="all-recipes-pagination">
            <div className="all-recipes-pagination-label">MORE RECIPES</div>
            <div className="all-recipes-pagination-row">
              {getPageButtons().map((btn, idx) =>
                btn === '...'
                  ? <span key={idx} className="all-recipes-ellipsis">...</span>
                  : <button
                      key={btn}
                      className={`all-recipes-page-btn${btn === page ? ' selected' : ''}`}
                      onClick={() => setPage(btn)}
                      disabled={btn === page}
                    >
                      {btn}
                    </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AllRecipes;
