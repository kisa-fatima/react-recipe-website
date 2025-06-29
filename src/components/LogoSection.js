import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/LogoSection.css';
import buzzfeedLogo from '../assets/images/buzzfeed.svg';
import purewowLogo from '../assets/images/purewow.svg';
import britcoLogo from '../assets/images/britco.svg';
import popsugarLogo from '../assets/images/popsugar.svg';
import everygirlLogo from '../assets/images/everygirl.svg';
import kitchnLogo from '../assets/images/kitchn.svg';

const logos = [
  { src: buzzfeedLogo, alt: 'BuzzFeed' },
  { src: purewowLogo, alt: 'PureWow' },
  { src: britcoLogo, alt: 'Brit+Co' },
  { src: popsugarLogo, alt: 'Popsugar' },
  { src: everygirlLogo, alt: 'The Everygirl' },
  { src: kitchnLogo, alt: 'Kitchn' },
];

const settings = {
  infinite: true,
  speed: 6000,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: 'linear',
  arrows: false,
  responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

const LogoSection = () => (
  <div className="logo-section logo-section-hide-mobile">
    <div className="logo-section-title">AS SEEN IN</div>
    <Slider {...settings} className="logo-row">
      {logos.map((logo, idx) => (
        <div key={idx} className="logo-slide">
          <img src={logo.src} alt={logo.alt} className="logo-img" />
        </div>
      ))}
    </Slider>
  </div>
);

export default LogoSection;
