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
         <section className="cateogries">
               <table>
                <thead>
                   <tr>
                   <th>SN <LuArrowDownUp /></th>
                    <th>Category <LuArrowDownUp /></th>
                    <th>Action</th>
                   </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Frontend</td>
                        <td className='button-gap'>
                            <Button className='edit_button' text={ <RiArrowDownSLine />} />
                            <Button className='edit_button' text={<RiEdit2Fill/>} />
                            <Button className='delete__button' text={<RiDeleteBin5Line/>} />
                        </td>
                    </tr>
                </tbody>
            </table>

         </section>
    )
}
