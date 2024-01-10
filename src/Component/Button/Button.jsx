import React from 'react'
import './button.css'
import { Link } from 'react-router-dom'
const Button = ({text,className,value}) => {
  return (
     <button className={className} type={value}>{text} </button>
  )
}

export default Button