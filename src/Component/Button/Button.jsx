import React from 'react'
import './button.css'
import { Link } from 'react-router-dom'
const Button = ({text,linkUrl}) => {
  return (
    <div>
      {/* <button>Submit</button> */}
     <Link to={linkUrl}>

     <button className='button'>{text} </button>
     </Link>  
    </div>
  )
}

export default Button