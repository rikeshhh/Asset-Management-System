import React, { useState } from "react";
import "./DataTable.css";
import Button from "../Button/Button";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { LuArrowDownUp } from "react-icons/lu";
export const DataTable = ({ CategoryOptions }) => {
  return (
    <section className="cateogries table__container">
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
          {CategoryOptions.map((options) => (
            <tr key={options.id}>
              <td>{options.id}</td>
              <td>{options.location || options.department}</td>
              <td className="button-gap">
                <Button className="edit__button" text={<CiEdit />}  />
                <Button className="delete__button" text={<GoTrash />} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
