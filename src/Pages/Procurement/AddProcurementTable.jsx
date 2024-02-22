import React from "react";
import Button from "../../Component/Button/Button";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import SelectInputCategory from "../Categories/SelectInputCategory";

const AddProcurementTable = () => {
  const handleTableEdit = () => {};
  const tableData = [
    {
      productName: "Mini PC-32GB",
      category: "Electronics",
      brand: "Bee-Link",
      estimatedPrice: "$500",
      link: "www.bee-link.com/minipc",
    },
    {
      productName: "Mini PC-32GB",
      category: "Electronics",
      brand: "Bee-Link",
      estimatedPrice: "$500",
      link: "www.bee-link.com/minipc",
    },
    {
      productName: "Mini PC-32GB",
      category: "Electronics",
      brand: "Bee-Link",
      estimatedPrice: "$500",
      link: "www.bee-link.com/minipc",
    },
  ];

  return (
    <div className="table__container">
      <table className="main__table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Catagory</th>
            <th>Brand</th>
            <th>Estimated Price</th>
            <th>Link</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((tableItem, index) => (
            <tr key={index}>
              <td>{tableItem.productName}</td>
              <td>{tableItem.category}</td>
              <td>{tableItem.brand}</td>
              <td>{tableItem.estimatedPrice}</td>
              <td>{tableItem.link}</td>
              <td className="button-gap">
                <Button
                  type={"button"}
                  className="edit__button"
                  onClick={handleTableEdit}
                  text={<CiEdit />}
                />
                <Button
                  type={"button"}
                  className="delete__button"
                  text={<GoTrash />}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddProcurementTable;
