import React from 'react';
import '../styles/SearchBar.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  return (
    <div className="searchbar-container">
      <div className="searchbar-input-wrapper">
        <span className="searchbar-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7B4A65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </span>
        <input className="searchbar-input" type="text" placeholder="Search our recipes" />
      </div>
      <span className="searchbar-or">or</span>
      <button className="searchbar-viewall" onClick={() => navigate('/all-recipes')}>+ VIEW ALL RECIPES</button>
    </div>
  );
};

export default SearchBar;
