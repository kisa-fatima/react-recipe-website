import React from 'react';
import '../styles/InfoSection.css';
import kitchenImg from '../assets/images/home-lindsay-kitchen.png';
import pourImg from '../assets/images/home-lindsay-pour.png';

const InfoSection = () => (
<div className="info-div">
  <div className="info-section">
    <div className="info-card">
      <div className="info-title">HI! I'M LINDSAY.</div>
      <div className="info-script">nice to meet you!</div>
      <div className="info-desc">
        I'm a former 4th grade teacher, now full time blogger. My husband Bjork and I live in Minnesota. Favorite things include my camera, lake days, and dark chocolate.
      </div>
      <button className="info-btn">LEARN MORE</button>
    </div>
    <div className="info-images">
      <img src={kitchenImg} alt="Lindsay in kitchen" className="info-img main-img" />
      <img src={pourImg} alt="Lindsay pouring" className="info-img side-img" />
    </div>
  </div>
  </div>
);

export default InfoSection;
