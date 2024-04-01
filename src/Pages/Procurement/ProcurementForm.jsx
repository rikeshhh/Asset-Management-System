import { useForm } from "react-hook-form";
import Button from "../../Component/Button/Button";
import { InputField } from "../../Component/Input/InputField";
import { Label } from "../../Component/Label/Label";
import Model from "../../Component/Model/Model";
import { SelectInput } from "../../Component/Input/SelectInput";
import { IoMdAdd } from "react-icons/io";
import { GrStatusGoodSmall } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import AddProcurementTable from "./AddProcurementTable";
import { useState } from "react";
import SelectUser from "./SelectUser";
import { procurementAdd } from "./ProcurementApiSlice";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../Component/Query/Query";
import { notifyError, notifySuccess } from "../../Component/Toast/Toast";
import CustomToastContainer from "../../Component/Toast/ToastContainer";

const ProcurementForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const navigate = useNavigate();
  const selectOptions = ["urgent", "high", "medium", "low"];

  const AddProcurement = useMutation({
    mutationFn: (procurementForm) => {
      return procurementAdd(procurementForm);
    },
    onSuccess: () => {
      notifySuccess("Procurement email has been sent to admin");
      setTimeout(() => {
        navigate("/procurement");
        queryClient.invalidateQueries("procurementTableData");
      }, 1000);
    },
    onError: (error) => {
      notifyError("Error sending procurement email to admin");
    },
  });

  const [procurementTableLine, setProcurementTableLine] = useState(true);
  const [newProcurement, setNewProcurement] = useState([
    {
      product_name: "",
      category_id: "",
      brand: "",
      estimated_price: "",
      link: "",
    },
  ]);

  const submitProcurement = (formData) => {
    const procurementForm = {
      formData: formData,
      tableData: newProcurement,
    };
    if (newProcurement.length === 0) {
      notifyError("Add any product to the table before submitting the form");
      return;
    }
    if (procurementTableLine) {
      notifyError("Save table line before filling the form");
      return;
    }
    if (formData.requested_by === "None") {
      notifyError("Select an employee");
      return;
    }
    AddProcurement.mutate(procurementForm);
  };

  return (
    <section className="content-wrapper">
      <div className="content-radius procurement">
        <div className="procurement__header--form form--header">
          <h2>Procurement Form</h2>
          <p>
            <span>Procurement /</span>
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
              />
            </div>
            <div className="user__auth--input procurement__form--input">
              <Label sup={"*"} text="Request Urgency" />
              <SelectInput
                name={"request_urgency"}
                register={register}
                option={selectOptions}
              />
            </div>
          </div>
          <div className="procurement__product procurement__form--float">
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

        <AddProcurementTable
          procurementTableLine={procurementTableLine}
          setProcurementTableLine={setProcurementTableLine}
          setNewProcurement={setNewProcurement}
          newProcurement={newProcurement}
        />
      </div>
      <CustomToastContainer />
    </section>
  );
};

export default ProcurementForm;
