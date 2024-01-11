import React from 'react'
import './input.css'
export const SelectInput = () => {
  return (
    <select id="cars" name="cars">
    <option value="volvo">Frontend</option>
    <option value="saab">Backedn</option>
    <option value="fiat">QA</option>
    <option value="audi">UI & UX</option>
  </select>
  )
}
