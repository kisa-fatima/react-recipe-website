import React, { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import '../styles/AdminRecipeCard.css';

const truncateLines = (text, maxLines = 2) => {
  if (!text) return '';
  const lines = Array.isArray(text) ? text : text.split('\n');
  if (lines.length <= maxLines) return lines.join('\n');
  return lines.slice(0, maxLines).join('\n') + '...';
};

const AdminRecipeCard = ({ image, label, cuisine, mealType, difficulty, ingredients, instructions, onEdit, onDelete }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="admin-recipe-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="admin-recipe-card-img-wrapper">
        <img src={image} alt={label} className="admin-recipe-card-img" />
      </div>
      <div className="admin-recipe-card-label">{label}</div>
      <div className="admin-recipe-card-cuisine">Cuisine: <span>{cuisine}</span></div>
      <div className="admin-recipe-card-cuisine">Meal Type: <span>{Array.isArray(mealType) ? mealType.join(', ') : mealType}</span></div>
      <div className="admin-recipe-card-cuisine">Difficulty: <span>{difficulty}</span></div>
      <div className="admin-recipe-card-section">
        <div className="admin-recipe-card-section-title">Ingredients</div>
        <div className="admin-recipe-card-section-content">
          {truncateLines(ingredients, 2)}
        </div>
      </div>
      <div className="admin-recipe-card-section">
        <div className="admin-recipe-card-section-title">Instructions</div>
        <div className="admin-recipe-card-section-content">
          {truncateLines(instructions, 2)}
        </div>
      </div>
      {hovered && (
        <div className="admin-recipe-card-actions">
          <button className="admin-recipe-card-btn edit" onClick={onEdit} aria-label="Edit">
            <FiEdit2 size={20} />
          </button>
          <button className="admin-recipe-card-btn delete" onClick={onDelete} aria-label="Delete">
            <FiTrash2 size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminRecipeCard;
