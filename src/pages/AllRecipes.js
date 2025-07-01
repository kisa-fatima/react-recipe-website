import React, { useEffect, useState } from 'react';
import { fetchAllRecipes, filterRecipesByMealType, filterRecipesByCuisine, fetchRecipeCusineTypes } from '../services/recipeApi';
import RecipeCard from '../components/RecipeCard';
import '../styles/AllRecipes.css';
import { ScheduleOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { Select, Button } from 'antd';
import Loader from '../components/Loader';

const RECIPES_PER_PAGE = 12;

const getQueryParam = (search, key, fallback) => {
  const params = new URLSearchParams(search);
  return params.get(key) || fallback;
};

const AllRecipes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const mealTypes = [
    { label: 'All', value: '' },
    { label: 'Breakfast', value: 'breakfast' },
    { label: 'Lunch', value: 'lunch' },
    { label: 'Dinner', value: 'dinner' },
  ];

  // Read from URL query params
  const [mealType, setMealType] = useState(() => getQueryParam(location.search, 'mealType', ''));
  const [cuisine, setCuisine] = useState(() => getQueryParam(location.search, 'cuisine', 'All'));
  const [sort, setSort] = useState(() => getQueryParam(location.search, 'sort', ''));
  const [page, setPage] = useState(() => Number(getQueryParam(location.search, 'page', 1)));
  const [cuisineOptions, setCuisineOptions] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (mealType) params.set('mealType', mealType);
    if (cuisine) params.set('cuisine', cuisine);
    if (sort) params.set('sort', sort);
    if (page > 1) params.set('page', page);
    navigate({ search: params.toString() }, { replace: true });
    // eslint-disable-next-line
  }, [mealType, cuisine, sort, page]);

  useEffect(() => {
    fetchRecipeCusineTypes().then(data => {
      setCuisineOptions([{ name: 'All' }, ...data]);
    });
  }, []);

  const handleFilter = async () => {
    setLoading(true);
    let all = await fetchAllRecipes(1000, 0);
    let filtered = all;
    if (mealType) {
      filtered = filtered.filter(r => Array.isArray(r.mealType) && r.mealType.some(mt => mt.toLowerCase() === mealType.toLowerCase()));
    }
    if (cuisine && cuisine !== 'All') {
      filtered = filtered.filter(r => r.cuisine && r.cuisine.toLowerCase() === cuisine.toLowerCase());
    }
    if (sort === 'rating-desc') {
      filtered = filtered.slice().sort((a, b) => b.rating - a.rating);
    } else if (sort === 'rating-asc') {
      filtered = filtered.slice().sort((a, b) => a.rating - b.rating);
    }
    setFilteredRecipes(filtered);
      setLoading(false);
  };

  // Sync state with URL on mount or when location.search changes (e.g., browser navigation)
  useEffect(() => {
    setMealType(getQueryParam(location.search, 'mealType', ''));
    setCuisine(getQueryParam(location.search, 'cuisine', 'All'));
    setSort(getQueryParam(location.search, 'sort', ''));
    setPage(Number(getQueryParam(location.search, 'page', 1)));
    // eslint-disable-next-line
  }, [location.search]);

  useEffect(() => {
    handleFilter();
    // eslint-disable-next-line
  }, [mealType, cuisine, sort]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('https://dummyjson.com/recipes').then(res => res.json()).then(data => {
      setTotal(data.total || 0);
    });
  }, [page]);

  // Pagination for filtered recipes
  const paginatedRecipes = filteredRecipes.slice((page - 1) * RECIPES_PER_PAGE, page * RECIPES_PER_PAGE);
  const totalPages = Math.ceil(filteredRecipes.length / RECIPES_PER_PAGE) || 1;

  return (
    <div className="all-recipes-page">
      <h2 className="all-recipes-title">
        <ScheduleOutlined style={{ color: '#edb654', fontSize: '2.1rem', verticalAlign: 'middle', marginRight: '0.5rem' }} />
        All Recipes
      </h2>
      <div className="all-recipes-filters" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span className="all-recipes-filter-label">Meal Type:</span>
        <Select
          value={mealType}
          onChange={v => { setMealType(v); setPage(1); }}
          style={{ minWidth: 140 }}
          placeholder="Meal Type"
          options={mealTypes}
        />
        <span className="all-recipes-filter-label">Cuisine:</span>
        <Select
          value={cuisine}
          onChange={v => { setCuisine(v); setPage(1); }}
          style={{ minWidth: 160 }}
          placeholder="Cuisine"
          options={cuisineOptions.map(c => ({ label: c.name, value: c.name }))}
        />
        <span className="all-recipes-filter-label">Sort by Rating:</span>
        <Select
          value={sort}
          onChange={v => setSort(v)}
          style={{ minWidth: 160 }}
          placeholder="Sort by Rating"
          options={[
            { label: 'Default', value: '' },
            { label: 'Rating: High to Low', value: 'rating-desc' },
            { label: 'Rating: Low to High', value: 'rating-asc' },
          ]}
        />
        <Button onClick={() => { setMealType(''); setCuisine('All'); setSort(''); setPage(1); }}>Reset</Button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          {filteredRecipes.length === 0 ? (
            <div className="all-recipes-empty">No recipes found for the selected filters.</div>
          ) : (
          <div className="all-recipes-cards">
              {paginatedRecipes.map(recipe => (
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
          <div className="all-recipes-pagination">
            {totalPages > 1 && (
              <>
            <div className="all-recipes-pagination-label">MORE RECIPES</div>
            <div className="all-recipes-pagination-row">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((btn) => (
                    <button
                      key={btn}
                      className={`all-recipes-page-btn${btn === page ? ' selected' : ''}`}
                      onClick={() => setPage(btn)}
                      disabled={btn === page}
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              </>
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default AllRecipes;
