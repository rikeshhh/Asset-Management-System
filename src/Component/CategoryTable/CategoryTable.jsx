import React, { useState } from 'react'
import './CategoryTable.css'
import Button from '../Button/Button';
import { RiDeleteBin5Line, RiEdit2Fill,RiArrowDownSLine,RiArrowUpSLine } from "react-icons/ri";
export const Category = ({value,selectedValue}) => {
    const [show, setShow] = useState(false);
    const [edit,setEdit] = useState(false);    
    const handleViewClick = () => {
        setShow((prev) => !prev);
    };
    return (
        <table>
            <tr>
                <th>SN</th>
                <th>Category</th>
                <th>Action</th>
            </tr>
            <tr>
                <td>1</td>
                <td>Category</td>
                <td >
                    <Button onClick={handleViewClick}  text={show?<RiArrowUpSLine/>:<RiArrowDownSLine/>} />
                    <Button text={<RiEdit2Fill/>} />
                    <Button  text={<RiDeleteBin5Line />}/>
                </td>
            </tr>
            {show && (
                <tr>
                    
                    <td>
                   <input value={value.Username}/>

              
                    </td>
                    <td>
                    {selectedValue}
                    </td>
                    <td>
                        <button onClick={()=>setEdit((prev)=>!prev)}>Edit</button>
                        <button>Delete</button>
                    </td>
                </tr>
            )}
        </table>
    )
}
