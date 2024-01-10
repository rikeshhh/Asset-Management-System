import React from 'react'
import './button.css'
import { Link } from 'react-router-dom'
const Button = ({text,className}) => {
  return (
     <button className={className}>{text} </button>
  )
}

export default Button