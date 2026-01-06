// NavigationComponent.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const NavigationComponent = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/listpage");
  };

  return handleNavigation();
};

export default NavigationComponent;
