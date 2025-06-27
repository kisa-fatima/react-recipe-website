import React, { useEffect, useState } from 'react';
import { fetchRecipeCusineTypes } from '../services/recipeApi';
import CircleCard from './CircleCard';
import Slider from 'react-slick';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CategoryBannerSmall.css';

const ArrowLeft = (props) => (
  <button {...props} className="custom-slick-arrow custom-slick-prev" aria-label="Previous">
    <FiChevronLeft size={18} />
  </button>
);
const ArrowRight = (props) => (
  <button {...props} className="custom-slick-arrow custom-slick-next" aria-label="Next">
    <FiChevronRight size={18} />
  </button>
);

function useIsMobile(breakpoint = 700) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);
  return isMobile;
}

const CategoryBannerSmall = () => {
  const [categories, setCategories] = useState([]);
  const isMobile = useIsMobile(700);

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
    nextArrow: <ArrowRight />,
    prevArrow: <ArrowLeft />,
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
      {isMobile ? (
        <div className="category-banner-small-scroll-row">
          {categories.map((cat) => (
            <CircleCard key={cat.name} image={cat.image} label={cat.name} />
          ))}
        </div>
      ) : (
        <Slider {...settings} className="category-banner-small-slider">
          {categories.map((cat) => (
            <CircleCard key={cat.name} image={cat.image} label={cat.name} />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default CategoryBannerSmall;

/*
NOTE: If arrows are still not visible, check for global CSS that might hide .slick-arrow or set display:none on buttons.
*/
