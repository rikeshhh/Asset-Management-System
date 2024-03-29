import Button from "../../Component/Button/Button";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { Label } from "../../Component/Label/Label";
import Model from "../../Component/Model/Model";
import { SelectInput } from "../../Component/Input/SelectInput";
import { InputField } from "../../Component/Input/InputField";
import { useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import { GrStatusGoodSmall } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PendingTableHead from "../../Component/PendingTable/PendingTableHead";
import { getProductList } from "./ProcurementApiSlice";
import PendingTableBody from "../../Component/PendingTable/PendingTableBody";
import { EmptyData } from "../../Component/EmptyData/EmptyData";

const ViewProcurement = () => {
  const {
    register,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const receivedData = location.state;
  const procurementData = receivedData.data;

  const { isPending, data: ProductList } = useQuery({
    queryKey: ["productList"],
    queryFn: () => getProductList(procurementData.id),
  });

  const selectOptions = ["urgent", "high", "medium", "low"];

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
        <div className="procurement__request">
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
                isDisabled={true}
              />
            </div>
          </div>
          <div className="procurement__product">
            <div className="procurement__bottom--buttons">
              <Button
                type={"button"}
                text="Add a table line"
                className="procurement--button procurement--button-not__allowed"
                icon={<IoMdAdd />}
                isDisabled={true}
              />
            </div>
          </div>
        </div>
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
              ) : !ProductList?.product_id ? (
                <EmptyData />
              ) : (
                ProductList?.data.map((procurement, index) => (
                  <tr>
                    <td>{procurement.product_name}</td>
                    <td>
                      {procurement.category.name
                        ? procurement.category.name
                        : "N/A"}
                    </td>
                    <td>{procurement.brand}</td>
                    <td>{`$${procurement.estimated_price}`}</td>
                    <td>{procurement.link}</td>
                    <td className="button-gap">
                      <Button
                        type="button"
                        className="procurement--button-not__allowed small-button__disabled"
                        text={<CiEdit />}
                        isDisabled={true}
                      />
                      <Button
                        type={"button"}
                        className="procurement--button-not__allowed small-button__disabled"
                        text={<GoTrash />}
                        isDisabled={true}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="procurement__product">
          <div className="procurement__bottom--buttons">
            <Button
              text="Fill Procurement"
              className={"procurement--button procurement--button-not__allowed"}
            />
            <Link to={"/procurement"} className="link">
              <Button text="Close" className={"procurement__error--button"} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewProcurement;
