import React from "react";
import "./button.css";
const Button = ({ text, className, type, handleClick, icon, isDisabled }) => {
  return (
    <button
      className={`${className} button__style`}
      type={type}
      onClick={handleClick}
      disabled={isDisabled}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
