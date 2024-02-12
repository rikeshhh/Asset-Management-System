import { useMutation } from "@tanstack/react-query";
import { InputField } from "../../Component/Input/InputField";
import { LuArrowDownUp } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { useState } from "react";
import Button from "../../Component/Button/Button";
import { queryClient } from "../../Component/Query/Query";
import { useForm } from "react-hook-form";
import Model from "../../Component/Model/Model";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { IoChevronDown } from "react-icons/io5";
import { categoryDelete, categoryEdit } from "./CategoryApiSice";
import SmallTablePendingHead from "../../Component/PendingTableSmall/SmallTablePendingHead";
import SmallTablePendingBody from "../../Component/PendingTableSmall/SmallTablePendingBody";
import { notifyError } from "../../Component/Toast/Toast";
import SubCategory from "./SubCategory";

const CategoryDataTable = ({ CategoryData, isPending, SubCategoryData }) => {
  const [show, setShow] = useState(false);
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [showSubCategoryDrop, setshowSubCategoryDrop] = useState("");

  const DeleteCategory = useMutation({
    mutationFn: (parentCategory) => {
      return categoryDelete(parentCategory);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("CategoryData");
    },
    onError: (error) => {
      notifyError(error.message);
      if (error.response.status === 401) {
        notifyError("Unauthorized: Please log in with valid id.");
      }
    },
  });

  const EditCategory = useMutation({
    mutationFn: (editData) => {
      return categoryEdit(editData.data, editData.previousCategory);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("CategoryData");
      setShow(false);
      reset();
    },
    onError: (error) => {
      notifyError(error.message);
      if (error.response.status === 401) {
        notifyError("Unauthorized: Please log in with valid id.");
      }
    },
  });

  const [previousCategory, setPreviousCategory] = useState("");
  const [previousCategoryId, setPreviousCategoryId] = useState("");

  const handleEditButtonClick = (options) => {
    setPreviousCategory(options.parent);
    setPreviousCategoryId(options.id);
    setShow(true);
    reset();
  };

  const handleSubCategoryClick = (options) => {
    setshowSubCategoryDrop(options.id);
    setShowSubCategory((prev) => !prev);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onCategoryEditSubmit = (data) => {
    const editData = {
      data: data.parent,
      previousCategory: previousCategory,
    };
    EditCategory.mutate(editData);
  };

  const handleEditCancel = () => {
    setShow(false);
    reset();
  };

  const onDeleteData = (parentCategory) => {
    DeleteCategory.mutate(parentCategory);
  };

  return (
    <section className="cateogries table__container">
      <table>
        <thead>
          {isPending ? (
            <SmallTablePendingHead />
          ) : (
            <tr>
              <th>
                SN <LuArrowDownUp />
              </th>
              <th>
                Category <LuArrowDownUp />
              </th>
              <th>Action</th>
            </tr>
          )}
        </thead>
        <tbody>
          {isPending ? (
            <SmallTablePendingBody />
          ) : (
            CategoryData.map((options, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {options.id === previousCategoryId && show ? (
                  <td>
                    <form onSubmit={handleSubmit(onCategoryEditSubmit)}>
                      <InputField
                        name="parent"
                        register={register}
                        required={Model.Group.required}
                        errors={errors}
                        type={Model.Group.type}
                        placeholder={options.parent}
                        minLength={Model.Group.minLength}
                        maxLength={Model.Group.maxLength}
                      ></InputField>
                      <button>
                        <IoMdCheckmark />
                      </button>
                      <button type="button" onClick={handleEditCancel}>
                        <RxCross1 />
                      </button>
                    </form>
                  </td>
                ) : (
                  <>
                    <td>
                      {options.parent}
                      {showSubCategory && options.id === showSubCategoryDrop ? (
                        <SubCategory SubCategoryData={SubCategoryData} />
                      ) : (
                        <></>
                      )}
                    </td>
                  </>
                )}
                <td className="button-gap">
                  <Button
                    handleClick={() => handleSubCategoryClick(options)}
                    text={<IoChevronDown className="  " />}
                    className={
                      showSubCategory && options.id === showSubCategoryDrop
                        ? "edit__button rotate__dropdown"
                        : "edit__button"
                    }
                  />

                  <Button
                    className="edit__button"
                    text={<CiEdit />}
                    handleClick={() => handleEditButtonClick(options)}
                  />
                  <Button
                    className="delete__button"
                    text={<GoTrash />}
                    handleClick={() => onDeleteData(options.parent)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default CategoryDataTable;
