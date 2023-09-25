import React from "react";
import Logo1 from '../images/logo.png';
import {Link} from "react-router-dom";

const Logo = () => {
  return (
    <Link to='/' className="logo-link">
      <img className="logo-light logo-img" src={Logo1} alt="logo" />
    
    </Link>
  );
};

export default Logo;
