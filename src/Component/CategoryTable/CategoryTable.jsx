import React, { useState } from 'react'
import './CategoryTable.css'
import Button from '../Button/Button';
import { RiDeleteBin5Line, RiEdit2Fill, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { LuArrowDownUp } from "react-icons/lu";

export const Category = ({ value, selectedValue }) => {
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const handleViewClick = () => {
        setShow((prev) => !prev);
    };
    return (
  <div className="category">
       <table>
        <thead>
            <th>SN <LuArrowDownUp/></th>
            <th>Category <LuArrowDownUp/></th>
            <th>Action</th>
        </thead>
        <tbody>
<tr>
    <td>1</td>
    <td>Frontend</td>
    <td>
        <RiDeleteBin5Line />
    <RiEdit2Fill/>
<RiArrowDownSLine/>
    </td>
</tr>
<tr>
    <td>1</td>
    <td>Frontend</td>
    <td>
        <RiDeleteBin5Line/>
    <RiEdit2Fill/>
<RiArrowDownSLine/>
    </td>
</tr>
        </tbody>
     </table>
  </div>  
  
    )
}
