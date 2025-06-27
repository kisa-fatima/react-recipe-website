import React, { useEffect, useState } from 'react';
import { fetchRecipeCusineTypes } from '../services/recipeApi';
import CircleCard from './CircleCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CircleCard.css';

const CategoryBannerSmall = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchRecipeCusineTypes();
      setCategories(data.slice(4)); // Use cuisines after the first 4
    };
    getCategories();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 9,
    slidesToScroll: 3,
    arrows: true,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="category-banner-small-slider-wrap">
      <Slider {...settings} className="category-banner-small-slider">
        {categories.map((cat) => (
          <CircleCard key={cat.name} image={cat.image} label={cat.name} />
        ))}
      </Slider>
    </div>
  );
};

export default CategoryBannerSmall;

/*
NOTE: If arrows are still not visible, check for global CSS that might hide .slick-arrow or set display:none on buttons.
*/
