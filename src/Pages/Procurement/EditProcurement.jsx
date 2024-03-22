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
import ProductListTableItem from "./ProductList";

const EditProcurement = () => {
  const [procurementTableLine, setProcurementTableLine] = useState(false);
  const [editProcurementLine, setEditProcurementLine] = useState(false);
  const [newProcurement, setNewProcurement] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [productId, setProductId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm();
  // console.log(errors);
  const location = useLocation();
  const receivedData = location.state;
  const procurementData = receivedData.data;

  const { isPending, data: ProductList } = useQuery({
    queryKey: ["productList"],
    queryFn: () => getProductList(procurementData.id),
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

  const selectOptions = ["urgent", "high", "medium", "low"];

  const handleCancelTableLine = () => {
    setProcurementTableLine(false);
    setSelectedIndex(null);
    reset();
  };

  const handleProcurementTableEdit = (index, productId) => {
    const values = getValues();

    // Update the item at the specified index with the new values
    const updatedItem = {
      product_name: values.product_name,
      category_id: values.category_id,
      brand: values.brand,
      estimated_price: values.estimated_price,
      link: values.link,
    };

    // Update the newProcurement state with the updated item
    const updatedProcurement = [...newProcurement];
    updatedProcurement[index] = updatedItem;
    setNewProcurement(updatedProcurement);

    // Reset state and form after editing
    setIsEditable(false);
    setProcurementTableLine(null);
    reset();
  };

  const handleDeleteProcurementLine = (productId) => {
    setSelectedIndex(null);
    setEditProcurementLine(false);
    DeleteProduct.mutate(productId);
    // reset();
  };

  const submitProcurementEdit = (data) => {};

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
                name="requestedBy"
                register={register}
                errors={errors}
                type={Model.Name.type}
                defaultValue={procurementData.user.requested_by}
                isDisabled={true}
              />
            </div>
            <div className="user__auth--input procurement__form--input">
              <Label sup={"*"} text="Request Urgency" />
              <SelectInput
                name={"request_urgency"}
                register={register}
                option={selectOptions}
                defaultValue={ProductList && ProductList.urgency}
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
                ) : ProductList.length !== 0 ? (
                  ProductList?.data.map((procurement, index) => (
                     <tr>
                      <td>
                        <InputField
                          name="product_name"
                          register={register}
                          errors={errors}
                          defaultValue={procurement.product_name}
                          isEditable={isEditable}
                        />
                      </td>
                      <td>
                        <SelectInputCategory
                          name="category_id"
                          register={register}
                          errors={errors}
                          defaultValue={procurement.category}
                          isEditable={isEditable}
                        />
                      </td>
                      <td>
                        <InputField
                          name="brand"
                          register={register}
                          errors={errors}
                          defaultValue={procurement.brand}
                          isEditable={isEditable}
                        />
                      </td>
                      <td>
                        <InputField
                          name="estimated_price"
                          register={register}
                          errors={errors}
                          defaultValue={procurement.estimated_price}
                          isEditable={isEditable}
                        />
                      </td>
                      <td>
                        <InputField
                          name="link"
                          register={register}
                          errors={errors}
                          defaultValue={procurement.link}
                          isEditable={isEditable}
                        />
                      </td>
                      <td className="button-gap">
                        <Button
                          type="button"
                          className="edit__button"
                          text={<FaCheck />}
                          handleClick={() => handleProcurementTableEdit(index)}
                        />
                        {/* <Button
                          type={"button"}
                          className={
                            procurementTableLine && index !== selectedIndex
                              ? "edit__button edit__not--allowed"
                              : "edit__button"
                          }
                          handleClick={() => handleProcurementTableEdit(index)}
                          text={<CiEdit />}
                        /> */}
                        <Button
                          type={"button"}
                          className="delete__button"
                          text={<GoTrash />}
                          handleClick={() => handleDeleteProcurementLine(index)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
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
