import React from 'react'

export const InputField = ({className,type,id,placeholder,maxlength,minlength}) => {
  return (
        <input
        type={type}
        maxlength={maxlength}
        minLength={minlength}
         placeholder={placeholder}
          className={className} 
          required
          />
  )
}
