import { useState } from "react";
import Button from "../../Component/Button/Button";
import { Label } from "../../Component/Label/Label";
import Model from "../../Component/Model/Model";
import { SelectInput } from "../../Component/Input/SelectInput";
import { InputField } from "../../Component/Input/InputField";
import { useForm } from "react-hook-form";
import SelectInputCategory from "../Categories/SelectInputCategory";
import { RxCross1 } from "react-icons/rx";
import { CiEdit } from "react-icons/ci";
import { GrStatusGoodSmall } from "react-icons/gr";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import PendingTableHead from "../../Component/PendingTable/PendingTableHead";
import { getProductList, productDelete } from "./ProcurementApiSlice";
import PendingTableBody from "../../Component/PendingTable/PendingTableBody";
import { queryClient } from "../../Component/Query/Query";
import CustomToastContainer from "../../Component/Toast/ToastContainer";
import { notifyError, notifySuccess } from "../../Component/Toast/Toast";
import EditProductList from "./EditProductList";

const EditProcurement = () => {
  const [newProcurement, setNewProcurement] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const location = useLocation();
  const receivedData = location.state;
  const procurementData = receivedData.data;
  const navigate = useNavigate();

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

  const submitProcurement = () => {};

  const selectOptions = ["urgent", "high", "medium", "low"];

  const handleDeleteProcurementLine = (productId) => {
    setSelectedIndex(null);
    DeleteProduct.mutate(productId);
    setNewProcurement([...newProcurement]);
    // reset();
  };

  const submitProcurementEdit = (data) => {
    if (newProcurement.length === 0) {
      navigate("/procurement");
    }
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
                name="requestedBy"
                register={register}
                errors={errors}
                type={Model.Name.type}
                defaultValue={procurementData.user.requested_by}
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
                text="Update Procurement"
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
                  <EditProductList
                    procurement={procurement}
                    index={index}
                    setSelectedIndex={setSelectedIndex}
                    selectedIndex={selectedIndex}
                    setIsEditable={setIsEditable}
                    isEditable={isEditable}
                    newProcurement={newProcurement}
                    setNewProcurement={setNewProcurement}
                    categoryName={categoryName}
                    setCategoryName={setCategoryName}
                    handleDeleteProcurementLine={handleDeleteProcurementLine}
                  />
                ))
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <CustomToastContainer />
    </section>
  );
};

export default EditProcurement;
