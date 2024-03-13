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
  const [procurementTableLine, setProcurementTableLine] = useState(false);
  const [editProcurementLine, setEditProcurementLine] = useState(false);
  const [newProcurement, setNewProcurement] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [productId, setProductId] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  // console.log(errors);
  const location = useLocation();
  const receivedData = location.state;
  const procurementData = receivedData.data;

  const { isPending, data: ProductList } = useQuery({
    queryKey: ["productList"],
    queryFn: () => getProductList(procurementData.id),
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

  const handleCancelTableLine = () => {
    setProcurementTableLine(false);
    setSelectedIndex(null);
    reset();
  };

  const handleProcurementTableEdit = (index, productId) => {
    setSelectedIndex(index);
    setProductId(productId);
    setEditProcurementLine(true);
    setProcurementTableLine(false);
    reset();
  };

  const handleDeleteProcurementLine = (productId) => {
    setSelectedIndex(null);
    setEditProcurementLine(false);
    DeleteProduct.mutate(productId);
    // reset();
  };

  const submitProcurementEdit = (data) => {
    console.log(data);
    const newItem = {
      product_id: productId,
      product_name: data.product_name,
      category_id: data.category_id,
      brand: data.brand,
      estimated_price: data.estimated_price,
      link: data.link,
    };
    // Check if the product with the same ID exists in newProcurement
    const existingIndex = newProcurement.findIndex(
      (item) => item.product_id === productId
    );

    // If the product exists, update its values
    if (existingIndex !== -1) {
      setNewProcurement((prevProcurement) => {
        const updatedProcurement = [...prevProcurement];
        updatedProcurement[existingIndex] = newItem;
        return updatedProcurement;
      });
      setEditProcurementLine(false);
    } else {
      // If the product doesn't exist, add it to newProcurement
      setNewProcurement((prevProcurement) => {
        return [...prevProcurement, newItem];
      });
      setEditProcurementLine(false);
    }
  };
  console.log(newProcurement);

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
                pattern={Model.Name.pattern}
                required={Model.Name.required}
                errorMessage={Model.Name.errorMessage}
                errors={errors}
                type={Model.Name.type}
                placeholder={Model.Name.placeholder}
                minLength={Model.Name.minLength}
                maxLength={Model.Name.maxLength}
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
                  ProductList?.data.map((tableItem, index) => (
                    <tr key={index}>
                      <td>
                        {editProcurementLine && index === selectedIndex ? (
                          <InputField
                            name="product_name"
                            register={register}
                            errors={errors}
                            defaultValue={
                              newProcurement[index]
                                ? newProcurement[index].product_name
                                : tableItem.product_name
                            }
                          />
                        ) : newProcurement[index] ? (
                          newProcurement[index].product_name
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
                            setCategoryName={setCategoryName}
                            defaultValue={tableItem.category.name}
                          />
                        ) : newProcurement[index] ? (
                          newProcurement[index].category_id
                        ) : (
                          tableItem.category.name
                        )}
                      </td>
                      <td>
                        {editProcurementLine && index === selectedIndex ? (
                          <InputField
                            name="brand"
                            register={register}
                            errors={errors}
                            defaultValue={
                              newProcurement[index]
                                ? newProcurement[index].brand
                                : tableItem.brand
                            }
                          />
                        ) : newProcurement[index] ? (
                          newProcurement[index].brand
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
                            defaultValue={
                              newProcurement[index]
                                ? newProcurement[index].estimated_price
                                : tableItem.estimated_price
                            }
                          />
                        ) : newProcurement[index] ? (
                          newProcurement[index].estimated_price
                        ) : (
                          tableItem.estimated_price
                        )}
                      </td>
                      <td>
                        {editProcurementLine && index === selectedIndex ? (
                          <InputField
                            name="link"
                            register={register}
                            errors={errors}
                            defaultValue={
                              newProcurement[index]
                                ? newProcurement[index].link
                                : tableItem.link
                            }
                          />
                        ) : newProcurement[index] ? (
                          newProcurement[index].link
                        ) : (
                          tableItem.link
                        )}
                      </td>
                      <td className="button-gap">
                        {editProcurementLine && index === selectedIndex ? (
                          <button
                            className="edit__button"
                            onClick={() => handleSubmit(submitProcurementEdit)}
                          >
                            <FaCheck />
                          </button>
                        ) : (
                          <Button
                            type={"button"}
                            className={
                              procurementTableLine && index !== selectedIndex
                                ? "edit__button edit__not--allowed"
                                : "edit__button"
                            }
                            handleClick={() =>
                              handleProcurementTableEdit(
                                index,
                                tableItem.products_id
                              )
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
