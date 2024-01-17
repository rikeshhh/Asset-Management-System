import React from "react";
import "./button.css";
const Button = ({
  text,
  className,
  type,
  hanldeClick,
  icon,
  isDisabled,
  isActive,
}) => {
  return (
    <button
      className={`${className}`}
      type={type}
      onClick={hanldeClick}
      disabled={isDisabled}
      isActive={isActive}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
