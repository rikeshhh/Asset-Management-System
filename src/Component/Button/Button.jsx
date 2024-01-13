import React from 'react'
import './button.css'
import { Link } from 'react-router-dom'
const Button = ({text,className,value,onClick,icon,isActive}) => {
  return (
     <button className={`${className} ${isActive ? ' active' : ''}` } type={value} onClick={onClick}>{icon} {text} </button>
  )
}

export default Button

