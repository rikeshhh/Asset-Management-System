import React from 'react'
import './input.css'
export const SelectInput = ({ onSelectChange }) => {
  return (
    <select id="cars" name="cars" onChange={onSelectChange}>
    <option value="Computer">Computer</option>
    <option value="Routers">Routerss</option>
    <option value="Acesssories">Acesssories</option>
    <option value="Backups">Backups</option>
  </select>
  )
}
