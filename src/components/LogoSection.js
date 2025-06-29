import React from 'react';
import '../styles/LogoSection.css';
import buzzfeedLogo from '../assets/images/buzzfeed.svg';
import purewowLogo from '../assets/images/purewow.svg';
import britcoLogo from '../assets/images/britco.svg';
import popsugarLogo from '../assets/images/popsugar.svg';
import everygirlLogo from '../assets/images/everygirl.svg';
import kitchnLogo from '../assets/images/kitchn.svg';

const LogoSection = () => (
  <div className="logo-section">
    <div className="logo-section-title">AS SEEN IN</div>
    <div className="logo-row">
      <img src={buzzfeedLogo} alt="BuzzFeed" className="logo-img" />
      <img src={purewowLogo} alt="PureWow" className="logo-img" />
      <img src={britcoLogo} alt="Brit+Co" className="logo-img" />
      <img src={popsugarLogo} alt="Popsugar" className="logo-img" />
      <img src={everygirlLogo} alt="The Everygirl" className="logo-img" />
      <img src={kitchnLogo} alt="Kitchn" className="logo-img" />
    </div>
  </div>
);

export default LogoSection;
