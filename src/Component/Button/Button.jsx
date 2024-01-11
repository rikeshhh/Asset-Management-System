import React from 'react'
import './button.css'
import { Link } from 'react-router-dom'
const Button = ({text,className,value,isDisabled}) => {
  return (
     <button className={className} type={value} disabled={isDisabled}>{text} </button>
  )
}

export default Button