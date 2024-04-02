import React, { useState } from "react";
import Button from "../../Component/Button/Button";
import ProductListTableItem from "./ProductList";
import { IoMdAdd } from "react-icons/io";
import { EmptyData } from "../../Component/EmptyData/EmptyData";
import { DeleteConfirmation } from "../../Component/DeleteConfirmation/DeleteConfirmation";

const AddProcurementTable = ({
  procurementTableLine,
  setProcurementTableLine,
  setNewProcurement,
  newProcurement,
}) => {
  const [isEditable, setIsEditable] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);
  const [productDeleteId, setProductDeleteId] = useState("");

  const handleAddProcurement = () => {
    setProcurementTableLine(true);
    setIsEditable(true);
    setNewProcurement([
      ...newProcurement,
      {
        product_name: "",
        category_id: "",
        brand: "",
        estimated_price: "",
        link: "",
      },
    ]);
  };

  const handleDeleteProcurementLine = (index) => {
    setDeleteConfirationShow(true);
    setProductDeleteId(index);
  };

  const handleCancelClick = () => {
    setDeleteConfirationShow(false);
  };

  const handleProceedClick = () => {
    setProcurementTableLine(false);
    setIsEditable(false);
    setDeleteConfirationShow(false);
    setNewProcurement(
      newProcurement.filter((_, idx) => idx !== productDeleteId)
    );
  };

  return (
    <>
      {deleteConfirationShow && (
        <DeleteConfirmation
          deleteName="Product Line"
          handleCancelClick={handleCancelClick}
          handleProceedClick={handleProceedClick}
        />
      )}
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
      <div className="table__container procurement__table">
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
              {newProcurement.length > 0 ? (
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
              ) : (
                <EmptyData />
              )}
            </>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AddProcurementTable;
