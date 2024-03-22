import React, { useState } from "react";
import Button from "../../Component/Button/Button";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { InputField } from "../../Component/Input/InputField";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa6";
import SelectInputCategory from "../Categories/SelectInputCategory";
import { RxCross1 } from "react-icons/rx";
import ProductListTableItem from "./ProductList";
import { IoMdAdd } from "react-icons/io";

const AddProcurementTable = ({
  procurementTableLine,
  setProcurementTableLine,
  setNewProcurement,
  newProcurement,
}) => {
  const {
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm();
  // const [newProcurement, setNewProcurement] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleAddProcurement = () => {
    reset();
    setIsEditable(true);
    setProcurementTableLine(true);
    setNewProcurement([
      ...newProcurement,
      {
        product_name: "",
        category_id: "None",
        brand: "",
        estimated_price: "",
        link: "",
      },
    ]);
  };

  const handleDeleteProcurementLine = (index) => {
    setProcurementTableLine(false);
    setIsEditable(false);
    setNewProcurement(newProcurement.filter((_, idx) => idx !== index));
  };

  console.log(newProcurement);

  return (
    <>
      <div className="procurement__product--list">
        <h3>Product List</h3>
        <Button
          type={"button"}
          text="Add a table line"
          className={
            procurementTableLine
              ? "procurement--button procurement--button-not__allowed"
              : "procurement--button"
          }
          handleClick={handleAddProcurement}
          icon={<IoMdAdd />}
          isDisabled={procurementTableLine ? true : false}
        />
      </div>
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
            <>
              {newProcurement?.map((procurement, index) => (
                <ProductListTableItem
                  key={procurement?.product_name}
                  index={index}
                  tableItem={procurement}
                  setNewProcurement={setNewProcurement}
                  setProcurementTableLine={setProcurementTableLine}
                  procurementTableLine={procurementTableLine}
                  handleDeleteProcurementLine={handleDeleteProcurementLine}
                  isEditable={isEditable}
                  setIsEditable={setIsEditable}
                  newProcurement={newProcurement}
                  setSelectedIndex={setSelectedIndex}
                  selectedIndex={selectedIndex}
                />
              ))}
            </>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AddProcurementTable;
