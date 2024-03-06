import React, { useState } from "react";
import Button from "../../Component/Button/Button";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { Label } from "../../Component/Label/Label";
import Model from "../../Component/Model/Model";
import { SelectInput } from "../../Component/Input/SelectInput";
import { InputField } from "../../Component/Input/InputField";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa6";
import SelectInputCategory from "../Categories/SelectInputCategory";
import { RxCross1 } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";
import { GrStatusGoodSmall } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import PendingTableHead from "../../Component/PendingTable/PendingTableHead";
import { getProductList, productDelete } from "./ProcurementApiSlice";
import PendingTableBody from "../../Component/PendingTable/PendingTableBody";
import { queryClient } from "../../Component/Query/Query";

const EditProcurement = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  // console.log(errors);
  const location = useLocation();
  const receivedData = location.state;
  const procurementId = receivedData.id;

  const {
    isPending,

    data: ProductList,
  } = useQuery({
    queryKey: ["productList"],
    queryFn: () => getProductList(procurementId),
    staleTime: 10000,
  });

  //   if (error) {
  //     return "An error has occurred: " + error.message;
  //   }

  const DeleteProduct = useMutation({
    mutationFn: (productId) => {
      return productDelete(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("productList");
      notifySuccess("Product has been deleted");
    },
    onError: (error) => {
      notifyError("Error deleting product");
    },
  });

  const handleAddProcurement = () => {
    setEditProcurementLine(false);
    setProcurementTableLine(true);
  };
  const submitProcurement = () => {};

  const selectOptions = ["Urgent", "High", "Medium", "Low"];

  const [procurementTableLine, setProcurementTableLine] = useState(false);
  const [editProcurementLine, setEditProcurementLine] = useState(false);
  //   const [newProcurement, setNewProcurement] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleCancelTableLine = () => {
    setProcurementTableLine(false);
    setSelectedIndex(null);
    reset();
  };

  const handleProcurementTableEdit = (index) => {
    setSelectedIndex(index);
    setEditProcurementLine(true);
    setProcurementTableLine(false);
    reset();
  };

  const handleDeleteProcurementLine = (productId) => {
    setSelectedIndex(null);
    setEditProcurementLine(false);
    DeleteProduct.mutate(productId);
    queryClient.invalidateQueries("productId");
    // reset();
  };

  const submitProcurementEdit = (data) => {
    console.log(data);
  };

  return (
    <section className="content-wrapper">
      <div className="content-radius procurement">
        <div className="procurement__header--form form--header">
          <h2>Procurement Form</h2>
          <p>
            <span>Procurement /</span>{" "}
            <GrStatusGoodSmall className="form__circle" /> Request an asset
          </p>
        </div>
        <form
          onSubmit={handleSubmit(submitProcurement)}
          className="procurement__request"
        >
          <div className="procurement__employee--dets">
            <div className="user__auth--input procurement__form--input">
              <Label sup={"*"} text="Requested By" />
              <InputField
                name="username"
                register={register}
                pattern={Model.Name.pattern}
                required={Model.Name.required}
                errorMessage={Model.Name.errorMessage}
                errors={errors}
                type={Model.Name.type}
                placeholder={Model.Name.placeholder}
                minLength={Model.Name.minLength}
                maxLength={Model.Name.maxLength}
              />
            </div>
            <div className="user__auth--input procurement__form--input">
              <Label sup={"*"} text="Request Urgency" />
              <SelectInput
                name={"request_urgency"}
                register={register}
                options={selectOptions}
              />
            </div>
          </div>
          <div className="procurement__product">
            <div className="procurement__bottom--buttons">
              <Button
                text="Fill Procurement"
                className={"procurement--button"}
              />
              <Link to={"/procurement"} className="link">
                <Button
                  text="Cancel"
                  className={"procurement__error--button"}
                />
              </Link>
            </div>
          </div>
        </form>
        <div className="procurement__product--list">
          <h3>Product List</h3>
          <Button
            type={"button"}
            text="Add a table line"
            className={
              editProcurementLine
                ? "procurement--button procurement--button-not__allowed"
                : "procurement--button"
            }
            handleClick={handleAddProcurement}
            icon={<IoMdAdd />}
            isDisabled={editProcurementLine ? true : false}
          />
        </div>
        <div className="table__container">
          <form onSubmit={handleSubmit(submitProcurementEdit)}>
            <table className="main__table">
              <thead>
                {isPending ? (
                  <PendingTableHead />
                ) : (
                  <tr>
                    <th>Product Name</th>
                    <th>Catagory</th>
                    <th>Brand</th>
                    <th>Estimated Price</th>
                    <th>Link</th>
                    <th>Action</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {isPending ? (
                  <PendingTableBody />
                ) : (
                  ProductList &&
                  ProductList.map((tableItem, index) => (
                    <tr key={index}>
                      <td>
                        {editProcurementLine && index === selectedIndex ? (
                          <InputField
                            name="product_name"
                            register={register}
                            errors={errors}
                            defaultValue={tableItem.product_name}
                          />
                        ) : (
                          tableItem.product_name
                        )}
                      </td>
                      <td>
                        {editProcurementLine && index === selectedIndex ? (
                          <SelectInputCategory
                            name="category_id"
                            register={register}
                            errors={errors}
                          />
                        ) : (
                          tableItem.category_name
                        )}
                      </td>
                      <td>
                        {editProcurementLine && index === selectedIndex ? (
                          <InputField
                            name="brand"
                            register={register}
                            errors={errors}
                            defaultValue={tableItem.brand}
                          />
                        ) : (
                          tableItem.brand
                        )}
                      </td>
                      <td>
                        {editProcurementLine && index === selectedIndex ? (
                          <InputField
                            name="estimated_price"
                            register={register}
                            errors={errors}
                            defaultValue={tableItem.estimated_price}
                          />
                        ) : (
                          tableItem.estimated_price
                        )}
                      </td>
                      <td>
                        {" "}
                        {editProcurementLine && index === selectedIndex ? (
                          <InputField
                            name="link"
                            register={register}
                            errors={errors}
                            defaultValue={tableItem.link}
                          />
                        ) : (
                          tableItem.link
                        )}
                      </td>
                      <td className="button-gap">
                        {editProcurementLine && index === selectedIndex ? (
                          <Button
                            type="submit"
                            className="edit__button"
                            text={<FaCheck />}
                          />
                        ) : (
                          <Button
                            type={"button"}
                            className={
                              procurementTableLine && index !== selectedIndex
                                ? "edit__button edit__not--allowed"
                                : "edit__button"
                            }
                            handleClick={() =>
                              handleProcurementTableEdit(index)
                            }
                            text={<CiEdit />}
                            isDisabled={procurementTableLine ? true : false}
                          />
                        )}
                        {editProcurementLine && index === selectedIndex ? (
                          <Button
                            type={"button"}
                            className="delete__button"
                            text={<RxCross1 />}
                            handleClick={() => {
                              setEditProcurementLine(false);
                              reset();
                            }}
                          />
                        ) : (
                          <Button
                            type={"button"}
                            className="delete__button"
                            text={<GoTrash />}
                            handleClick={() =>
                              handleDeleteProcurementLine(tableItem.products_id)
                            }
                          />
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProcurement;
