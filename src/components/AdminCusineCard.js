import React, { useState } from 'react';
import '../styles/AdminRecipeCard.css';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const AdminCusineCard = ({ image, name, description, onEdit, onDelete }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="admin-recipe-card admin-cusine-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="admin-recipe-card-img-wrapper">
        <img src={image} alt={name} className="admin-recipe-card-img" />
      </div>
      <div className="admin-recipe-card-label">{name}</div>
      <div className="admin-recipe-card-section-content" style={{ marginBottom: 12 }}>{description}</div>
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

export default AdminCusineCard;
