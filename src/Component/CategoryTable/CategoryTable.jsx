import React, { useState } from 'react'
import './CategoryTable.css'
import Button from '../Button/Button';
export const Category = () => {
    const [show, setShow] = useState(false);
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
                <td>
                    <Button onClick={handleViewClick} text='View' />
                    <Button text='Edit' />
                    <Button text='Delete' />
                </td>
            </tr>
            {show && (
                <tr>
                    <td></td>
                    <td>
                        <ol type='a'>
                            <li>Mini</li>
                            <li>MINI</li>
                            <li>MAC</li>
                        </ol>
                    </td>
                    <td>
                        <button>Edit</button>
                        <button>Delete</button>
                    </td>
                </tr>
            )}
        </table>
    )
}
