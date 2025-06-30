import React, { useState } from 'react';
import '../styles/SearchBar.css';
import { useNavigate } from 'react-router-dom';
import SearchDrawer from './SearchDrawer';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchDrawerOpen, setSearchDrawerOpen] = useState(false);

  return (
    <div className="searchbar-container">
      <div className="searchbar-input-wrapper" onClick={() => setSearchDrawerOpen(true)} style={{cursor: 'pointer'}}>
        <span className="searchbar-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7B4A65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </span>
        <input className="searchbar-input" type="text" placeholder="Search our recipes" readOnly tabIndex={-1} style={{pointerEvents: 'none', background: '#fff'}} />
      </div>
      <span className="searchbar-or">or</span>
      <button className="searchbar-viewall" onClick={() => navigate('/all-recipes')}>+ VIEW ALL RECIPES</button>
      <SearchDrawer open={searchDrawerOpen} onClose={() => setSearchDrawerOpen(false)} />
    </div>
  );
};

export default SearchBar;
