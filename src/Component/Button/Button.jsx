import React from "react";
import "./button.css";
import { Link } from "react-router-dom";
const Button = ({ text, className, type, onClick, icon, isDisabled }) => {
  return (
    <button
      className={`${className}`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
