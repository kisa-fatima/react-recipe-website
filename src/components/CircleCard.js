import React from 'react';
import '../styles/CircleCard.css';

const CircleCard = ({ image, label }) => (
  <div className="circle-card">
    <div className="circle-card-img-wrapper">
      <img src={image} alt={label} className="circle-card-img" />
    </div>
    <div className="circle-card-label">{label}</div>
  </div>
);

export default CircleCard;
