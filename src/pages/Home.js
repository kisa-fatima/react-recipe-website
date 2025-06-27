import React from 'react';
import { Row, Col, Card } from 'antd';
import './Home.css';
import CategoryBannerBig from '../components/CategoryBannerBig';
import CategoryBannerSmall from '../components/CategoryBannerSmall';

const Home = () => {
  return (
    <>
      <Row justify="center" align="middle" className="home-banner-row">
        <Col span={24}>
          <Card bordered={false} className="home-banner-card">
            <span className="home-banner-title">
              SIMPLE RECIPES MADE FOR
            </span>
            <span className="script-text home-banner-script">
              real, actual, everyday life.
            </span>
          </Card>
        </Col>
      </Row>
      <CategoryBannerBig />
      <CategoryBannerSmall />
    </>
  );
};

export default Home;