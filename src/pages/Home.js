import React, { useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import '../styles/Home.css';
import CategoryBannerBig from '../components/CategoryBannerBig';
import CategoryBannerSmall from '../components/CategoryBannerSmall';
import SearchBar from '../components/SearchBar';
import buzzfeedLogo from '../assets/images/buzzfeed.svg';
import LogoSection from '../components/LogoSection';
import InfoSection from '../components/InfoSection';
import SignupSection from '../components/SignupSection';
import RecipeCard from '../components/RecipeCard';
import SelectSection from '../components/SelectSection';

const Home = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      
      <Row justify="center" align="middle" className="home-banner-row">
        <Col span={24}>
          <Card bordered={false} className="home-banner-card">
            <div className="banner-content">
              <span className="home-banner-title">
                SIMPLE RECIPES MADE FOR
              </span>
              <span className="script-text home-banner-script">
                real, actual, everyday life.
              </span>
            </div>
          </Card>
        </Col>
      </Row>
      <CategoryBannerBig />
      <CategoryBannerSmall />
      <div className="searchbar-center-wrapper">
        <SearchBar />
      </div>
      <LogoSection />
      <InfoSection />
      <SignupSection />
      <SelectSection />
    
    </>
  );
};

export default Home;