import React, { useState } from "react";
import "./CategoryTable.css";
import Button from "../Button/Button";
import { RiArrowDownSLine } from "react-icons/ri";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
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
            <th>
              SN <LuArrowDownUp />
            </th>
            <th>
              Category <LuArrowDownUp />
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Frontend</td>
            <td className="button-gap">
              <Button className="edit_button" text={<RiArrowDownSLine />} />
              <Button className="edit_button" text={<CiEdit />} />
              <Button className="delete__button" text={<GoTrash />} />
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};
