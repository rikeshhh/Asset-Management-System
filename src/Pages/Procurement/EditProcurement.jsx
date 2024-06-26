import { useEffect, useState } from "react";
import Button from "../../Component/Button/Button";
import { Label } from "../../Component/Label/Label";
import Model from "../../Component/Model/Model";
import { SelectInput } from "../../Component/Input/SelectInput";
import { useForm } from "react-hook-form";
import { GrStatusGoodSmall } from "react-icons/gr";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import PendingTableHead from "../../Component/PendingTable/PendingTableHead";
import { getProductList, procurementEdit } from "./ProcurementApiSlice";
import PendingTableBody from "../../Component/PendingTable/PendingTableBody";
import CustomToastContainer from "../../Component/Toast/ToastContainer";
import { notifyError, notifySuccess } from "../../Component/Toast/Toast";
import EditProductList from "./EditProductList";
import SelectUser from "./SelectUser";
import { queryClient } from "../../Component/Query/Query";
import { EmptyData } from "../../Component/EmptyData/EmptyData";
import { DeleteConfirmation } from "../../Component/DeleteConfirmation/DeleteConfirmation";

const EditProcurementData = () => {
  const [newProcurement, setNewProcurement] = useState();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [deletedId, setDeletedId] = useState([]);
  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);
  const [productDeleteId, setProductDeleteId] = useState("");

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

  const {
    isPending,
    isFetching,
    data: ProductList,
  } = useQuery({
    queryKey: ["productList"],
    queryFn: () => getProductList(procurementData.id),
  });
  //   if (error) {
  //     return "An error has occurred: " + error.message;
  //   }

  const EditProcurementData = useMutation({
    mutationFn: (editProcurementData) => {
      return procurementEdit(editProcurementData);
    },
    onSuccess: () => {
      notifySuccess("Procurement has been Updated");
      setTimeout(() => {
        navigate("/procurement");
        queryClient.invalidateQueries("procurementTableData");
      }, 1000);
    },
    onError: (error) => {
      notifyError("Error editing procurement");
    },
  });

  useEffect(() => {
    if (procurementData.number_of_items > 0) {
      setNewProcurement(ProductList?.data);
      queryClient.invalidateQueries("productList");
    } else {
      setNewProcurement([]);
    }
  }, [ProductList]);

  const defaultValue = {
    id: ProductList?.requested_by_id,
    name: ProductList?.requested_by_name,
  };

  const submitProcurement = (procurementEditData) => {
    const joinedDeletedId = deletedId.join("_");
    const editProcurementData = {
      id: procurementData.id,
      formData: procurementEditData,
      products: newProcurement,
      deletedId: joinedDeletedId,
    };
    if (isEditable) {
      notifyError("Save the product line before submitting the form");
      return;
    }
    EditProcurementData.mutate(editProcurementData);
  };

  const selectOptions = ["urgent", "high", "medium", "low"];

  const handleDeleteProcurementLine = (index) => {
    setDeleteConfirationShow(true);
    setProductDeleteId(index);
  };

  const handleCancelClick = () => {
    setDeleteConfirationShow(false);
  };

  const handleProceedClick = () => {
    setDeleteConfirationShow(false);

    setSelectedIndex(null);
    setDeletedId([...deletedId, newProcurement[productDeleteId].product_id]);
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
                <SelectUser
                  name="requested_by"
                  register={register}
                  errors={errors}
                  defaultValue={defaultValue}
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
            <div className="procurement__product procurement__form--float">
              <div className="procurement__bottom--buttons">
                <Button
                  text="Update Procurement"
                  className={"procurement--button"}
                />
                <Link to={"/procurement"} className="link">
                  <Button
                    text="Cancel"
                    className={"procurement__error--button"}
                    handleClick={() => {
                      setNewProcurement([]);
                      setDeletedId([]);
                    }}
                  />
                </Link>
              </div>
            </div>
          </form>
          <div className="procurement__product--list">
            <h3>Product List</h3>
          </div>
          <div className="table__container procurement__table">
            <table className="main__table">
              <thead>
                {isPending || isFetching ? (
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
                {isPending || isFetching ? (
                  <PendingTableBody />
                ) : newProcurement?.length === 0 ? (
                  <EmptyData />
                ) : (
                  ProductList &&
                  newProcurement?.map((procurement, index) => (
                    <EditProductList
                      procurement={procurement}
                      index={index}
                      setSelectedIndex={setSelectedIndex}
                      selectedIndex={selectedIndex}
                      setIsEditable={setIsEditable}
                      isEditable={isEditable}
                      newProcurement={newProcurement}
                      setNewProcurement={setNewProcurement}
                      handleDeleteProcurementLine={handleDeleteProcurementLine}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <CustomToastContainer />
      </section>
    </>
  );
};

export default EditProcurementData;
