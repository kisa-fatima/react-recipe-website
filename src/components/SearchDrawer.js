import React, { useState } from 'react';
import { Drawer, Input, Spin } from 'antd';
import RecipeCard from './RecipeCard';
import { searchRecipes } from '../services/recipeApi';
import '../styles/SearchDrawer.css';

const SearchDrawer = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim().length === 0) {
      setResults([]);
      return;
    }
    setLoading(true);
    const recipes = await searchRecipes(value);
    setResults(recipes);
    setLoading(false);
  };

  return (
    <Drawer
      title={<span style={{fontFamily: 'Arvo, serif', fontWeight: 700}}>Search Recipes</span>}
      placement="bottom"
      onClose={onClose}
      open={open}
      height={600}
      className="search-drawer"
      closable={true}
      closeIcon={undefined}
      headerStyle={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <Input
        placeholder="Type to search..."
        value={query}
        onChange={handleSearch}
        allowClear
        size="large"
        className="search-drawer-input"
        autoFocus
      />
      <div className="search-drawer-results">
        {loading ? (
          <div className="search-drawer-loading"><Spin /></div>
        ) : (
          results.length > 0 ? (
            <div className="search-drawer-cards-grid">
              {results.map(recipe => (
                <div key={recipe.id} className="search-drawer-card-wrapper">
                  <RecipeCard
                    image={recipe.image}
                    label={recipe.name}
                    rating={recipe.rating}
                    onClick={() => { window.location.href = `/recipe/${recipe.id}`; onClose(); }}
                  />
                </div>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="search-drawer-empty">No recipes found.</div>
          ) : null
        )}
      </div>
    </Drawer>
  );
};

export default SearchDrawer;
