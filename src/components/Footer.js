import React from 'react';
import { Row, Col, Input, Button } from 'antd';
import {
  InstagramOutlined,
  YoutubeOutlined,
  FacebookOutlined,
} from '@ant-design/icons';
import { FaPinterestP, FaTiktok, FaXTwitter } from 'react-icons/fa6';

const Footer = () => (
  <footer className="footer-wrapper">
    <div className="footer-main">
      <Row gutter={[0, 32]} justify="center" className="footer-mobile-cols-row">
        <Col xs={12} md={6}>
          <div className="footer-col-title">PINCH OF YUM</div>
          <ul className="footer-links">
            <li>About</li>
            <li>Blog</li>
            <li>Recipe Index</li>
            <li>Blogging Resources</li>
            <li>Income Reports</li>
            <li>Sponsored Content</li>
            <li>Media Mentions</li>
            <li>Contact</li>
          </ul>
        </Col>
        <Col xs={12} md={6}>
          <div className="footer-col-title">FOOD & RECIPES</div>
          <ul className="footer-links">
            <li>Sugar Free January</li>
            <li>Freezer Meals 101</li>
            <li>Quick and Easy Recipes</li>
            <li>Instant Pot Recipes</li>
            <li>Pasta Recipes</li>
            <li>Vegan Recipes</li>
            <li>Soup Recipes</li>
            <li>Taco Recipes</li>
            <li>Meal Prep Recipes</li>
          </ul>
        </Col>
        <Col xs={24} md={12} className="footer-signup-col footer-signup-mobile-hide">
          <div className="footer-signup-box">
            <div className="footer-signup-title">
              <span className="footer-signup-script">signup</span> FOR EMAIL UPDATES
            </div>
            <div className="footer-signup-desc">
              Get a Free eCookbook with our top 25 recipes.
            </div>
            <div className="footer-signup-form">
              <Input placeholder="First Name" className="footer-signup-input" />
              <Input placeholder="Email" className="footer-signup-input" />
              <Button className="footer-signup-btn">GO</Button>
            </div>
          </div>
          <div className="footer-brands" style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <div className="footer-brands-title">OUR OTHER BRANDS</div>
            <div className="footer-brands-logos" style={{ justifyContent: 'center' }}>
              <a href="https://www.foodbloggerpro.com/" target="_blank" rel="noopener noreferrer">
                <img src="https://pinchofyum.com/wp-content/assets/images/food-blogger-pro-logo.png" alt="Food Blogger Pro" className="footer-brand-img grayscale-hover" />
              </a>
              <a href="https://www.clariti.com/" target="_blank" rel="noopener noreferrer">
                <img src="https://th.bing.com/th/id/OIP.SGes1v1XuAIPURzmgaVnDQHaC9?rs=1&pid=ImgDetMain&cb=idpwebpc2" alt="Clariti" className="footer-brand-img grayscale-hover" />
              </a>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className="footer-social-padding">
            <div className="footer-social-icons">
              <a href="#"><InstagramOutlined /></a>
              <a href="#"><FaPinterestP /></a>
              <a href="#"><FaTiktok /></a>
              <a href="#"><FacebookOutlined /></a>
              <a href="#"><FaXTwitter /></a>
              <a href="#"><YoutubeOutlined /></a>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="footer-logo-row" align="middle">
        <Col span={24}>
          <div className="footer-logo-copyright-flex">
            <div className="footer-logo">
              <span className="logo-main">pinch</span><span className="logo-of">of</span><span className="logo-main">yum</span>
            </div>
            <div className="footer-copyright" style={{ marginLeft: 0, paddingLeft: 0 }}>
              <div>© 2025 Pinch of Yum. All Rights Reserved.</div>
              <div>A Raptive Partner Site.</div>
            </div>
          </div>
        </Col>
      </Row>
      <Row justify="center" className="footer-legal-row">
        <Col>
          <a href="#" className="footer-legal-link">Privacy Policy</a>
          <a href="#" className="footer-legal-link">Terms</a>
        </Col>
      </Row>
      <Row justify="center" className="footer-ad-row">
        <Col>
          <div className="footer-ad-text">
            Information from your device can be used to personalize your ad experience.
          </div>
        </Col>
      </Row>
    </div>
  </footer>
);

export default Footer;
