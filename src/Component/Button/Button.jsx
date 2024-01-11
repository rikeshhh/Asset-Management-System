import React from 'react'
import './button.css'
import { Link } from 'react-router-dom'
const Button = ({text,className,value,onClick}) => {
  return (
     <button className={className} type={value} onClick={onClick}>{text} </button>
  )
}

export default Button