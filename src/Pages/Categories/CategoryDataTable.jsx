import "../../Component/DataTable/DataTable.css";
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
import { FaCheck } from "react-icons/fa6";

/**
 * React component representing the table for displaying category data.
 * @param {Object} props - Component props.
 * @param {Array} props.CategoryData - Array of category data.
 * @param {boolean} props.isPending - Indicates whether the data is pending or not.
 * @param {Array} props.SubCategoryData - Array of subcategory data.
 */

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
      notifyError(error.response.message);
    },
  });

  const [previousCategory, setPreviousCategory] = useState("");

  const [previousCategoryId, setPreviousCategoryId] = useState("");
  const [newCategory, setNewCategory] = useState("");

  /**
   * Handles the click event for the edit button.
   * @param {Object} options - Options for the category.
   */
  const handleEditButtonClick = (options) => {
    setPreviousCategory(options.parent);
    setPreviousCategoryId(options.id);
    setShow(true);
    reset();
  };

  /**
   * Handles the click event for the subcategory button.
   * @param {Object} options - Options for the category.
   */

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

  /**
   * Handles the form submission for category edits.
   * @param {Object} data - Form data.
   */

  const onCategoryEditSubmit = (data) => {
    const editData = {
      data: data.parent,
      previousCategory: previousCategory,
    };
    EditCategory.mutate(editData);
  };

  /**
   * Handles the click event for the cancel button in the edit form.
   */
  const handleEditCancel = () => {
    setShow(false);
    reset();
  };

  /**
   * Handles the click event for the delete button.
   * @param {string} parentCategory - The parent category to delete.
   */

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
                  <td className={show ? "universal__td--border" : ""}>
                    <form
                      onSubmit={handleSubmit(onCategoryEditSubmit)}
                      className="universal__update--form"
                    >
                      <div className="universal__input--container">
                        <InputField
                          name="parent"
                          register={register}
                          required="Category is required"
                          errors={errors}
                          type={Model.department.type}
                          placeholder={options.parent}
                          inputValue={options.parent}
                          value={Model.department.pattern.value}
                          message={Model.department.pattern.message}
                          minLength={Model.department.minLength}
                          minMessage="Category name should be more than 1 characters"
                          maxMessage="Category name should be less than 64 characters"
                          maxLength={Model.department.maxLength}
                          className={show ? "universal__table--input" : ""}
                        ></InputField>
                      </div>
                      <div className="universal__FormButton">
                        <Button className="" text={<FaCheck />} />
                        <Button
                          type="button"
                          className=""
                          text={<RxCross1 />}
                          handleClick={handleEditCancel}
                        />
                      </div>
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
