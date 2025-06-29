import React from 'react';
import '../styles/SignupSection.css';
import { InstagramOutlined, YoutubeOutlined, FacebookOutlined } from '@ant-design/icons';
import { FaPinterestP, FaTiktok, FaXTwitter } from 'react-icons/fa6';

const SignupSection = () => (
  <div className="signup-section">
    <div className="signup-section-inner">
      <div className="signup-social">
        <span className="signup-social-label">FOLLOW US</span>
        <div className="signup-social-icons">
          <a href="#"><InstagramOutlined /></a>
          <a href="#"><FaPinterestP /></a>
          <a href="#"><FaTiktok /></a>
          <a href="#"><FacebookOutlined /></a>
          <a href="#"><FaXTwitter /></a>
          <a href="#"><YoutubeOutlined /></a>
        </div>
      </div>
      <div className="signup-form-block">
        <div className="signup-title-row">
          <span className="signup-title-script">signup</span>
          <span className="signup-title-bold">FOR EMAIL UPDATES</span>
        </div>
        <form className="signup-form-row">
          <input className="signup-input" type="text" placeholder="First Name" />
          <input className="signup-input" type="email" placeholder="Email" />
          <button className="signup-btn" type="submit">GO</button>
        </form>
      </div>
    </div>
  </div>
);

export default SignupSection;
