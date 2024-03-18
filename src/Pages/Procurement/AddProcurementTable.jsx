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

const AddProcurementTable = ({
  procurementTableLine,
  setProcurementTableLine,
  setNewProcurement,
  newProcurement,
  setIsEditable,
  isEditable,
}) => {
  const {
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm();
  // const [newProcurement, setNewProcurement] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleCancelTableLine = () => {
    setProcurementTableLine(false);
    setSelectedIndex(null);
    reset();
  };

  const handleProcurementTableAdd = (index) => {
    console.log(index);
    const values = getValues();
    setSelectedIndex(index);
    const newItem = {
      product_name: values.product_name,
      category_id: values.category_id,
      brand: values.brand,
      estimated_price: values.estimated_price,
      link: values.link,
    };

    setNewProcurement([...newProcurement]);

    setIsEditable(false);
    setSelectedIndex(null);
    reset();
  };

  const handleDeleteProcurementLine = (index) => {
    setNewProcurement(newProcurement.filter((_, idx) => idx !== index));
  };

  // const handleTableLineSubmit = (tableData) => {
  //   const newItem = {
  //     product_name: tableData.product_name,
  //     category_id: tableData.category_id,
  //     brand: tableData.brand,
  //     estimated_price: tableData.estimated_price,
  //     link: tableData.link,
  //   };

  //   setNewProcurement((prevProcurement) => [...prevProcurement, newItem]);
  //   setProcurementTableLine(false);
  //   reset();
  // };

  console.log(newProcurement);

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
          <>
            {newProcurement?.map((procurement, index) => (
              <ProductListTableItem
                key={procurement?.product_name}
                index={index}
                tableItem={procurement}
                setNewProcurement={setNewProcurement}
                setProcurementTableLine={setProcurementTableLine}
                selectedIndex={selectedIndex}
                procurementTableLine={procurementTableLine}
                handleProcurementTableAdd={handleProcurementTableAdd}
                handleDeleteProcurementLine={handleDeleteProcurementLine}
                register={register}
                errors={errors}
                getValues={getValues}
                reset={reset}
                isEditable={isEditable}
              />
            ))}
          </>
        </tbody>
      </table>
    </div>
  );
};

export default AddProcurementTable;
