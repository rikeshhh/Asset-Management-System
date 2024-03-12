import "../../Component/DataTable/DataTable.css";
import "./Categories.css";
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
import { RxCross1 } from "react-icons/rx";
import { IoChevronDown } from "react-icons/io5";
import {
  categoryDelete,
  categoryEdit,
  subCategoryEdit,
} from "./CategoryApiSice";
import SmallTablePendingHead from "../../Component/PendingTableSmall/SmallTablePendingHead";
import SmallTablePendingBody from "../../Component/PendingTableSmall/SmallTablePendingBody";
import { notifyError, notifySuccess } from "../../Component/Toast/Toast";
import { FaCheck } from "react-icons/fa6";
import CustomToastContainer from "../../Component/Toast/ToastContainer";

/**
 * React component representing the table for displaying category data.
 * @param {Object} props - Component props.
 * @param {Array} props.CategoryData - Array of category data.
 * @param {boolean} props.isPending - Indicates whether the data is pending or not.
 * @param {Array} props.SubCategoryData - Array of subcategory data.
 */

const CategoryDataTable = ({
  CategoryData,
  isPending,
  handleDeleteClick,
  setDisableButtons,
  disableButtons,
  setCategoryDataOrder,
  categoryDataOrder,
}) => {
  const [show, setShow] = useState(false);
  const [showSubCategoryEdit, setShowSubCategoryEdit] = useState(false);
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [showSubCategoryDrop, setshowSubCategoryDrop] = useState("");

  // const DeleteCategory = useMutation({
  //   mutationFn: (parentCategory) => {
  //     return categoryDelete(parentCategory);
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("CategoryData");
  //   },
  //   onError: (error) => {
  //     notifyError(error.message);
  //     if (error.response.status === 401) {
  //       notifyError("Unauthorized: Please log in with valid id.");
  //     }
  //   },
  // });

  const EditCategory = useMutation({
    mutationFn: (editData) => {
      return categoryEdit(editData.data, editData.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("CategoryData");
      notifySuccess("Category has been updated");
      setDisableButtons(false);
      setShow(false);
      reset();
    },
    onError: (error) => {
      notifyError(error.response.data.message.message.newParent);
    },
  });

  const EditSubCategory = useMutation({
    mutationFn: (editData) => {
      return subCategoryEdit(editData.data, editData.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("CategoryData");
      setDisableButtons(false);
      setShowSubCategoryEdit(false);
      reset();
    },
    onError: (error) => {
      notifyError(error.response.message);
    },
  });

  const [previousCategoryId, setPreviousCategoryId] = useState("");
  const [previousSubCategoryId, setPreviousSubCategoryId] = useState("");
  const [previousCategoryName, setPreviousCategoryName] = useState("");

  /**
   * Handles the click event for the edit button.
   * @param {Object} options - Options for the category.
   */
  const handleEditButtonClick = (options) => {
    setDisableButtons(true);
    setPreviousCategoryName(options.parent);
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
    if (previousCategoryName === data.parent) {
      setShow(false);
      setDisableButtons(false);
    } else {
      const editData = {
        data: data.parent,
        id: previousCategoryId,
      };
      EditCategory.mutate(editData);
    }
  };

  /**
   * Handles the click event for the cancel button in the edit form.
   */
  const handleEditCancel = () => {
    setDisableButtons(false);
    setShow(false);
    reset();
  };

  /**
   * Handles the click event for the delete button.
   * @param {string} parentCategory - The parent category to delete.
   */

  // const onDeleteData = (parentCategory) => {
  //   handleDeleteClick(categoryId);
  // };

  const handleSubCategoryEdit = (subCategory) => {
    setDisableButtons(true);
    setShowSubCategoryEdit(true);
    setPreviousSubCategoryId(subCategory.id);
    reset();
  };

  const handleSubCategoryCancel = () => {
    setDisableButtons(false);
    setShowSubCategoryEdit(false);
    reset();
  };

  const onSubCategoryEditSubmit = (data) => {
    const editData = {
      data: data.child,
      id: previousSubCategoryId,
    };

    EditSubCategory.mutate(editData);
  };

  const handleCategorySort = () => {
    const newOrder = categoryDataOrder === "ASC" ? "DESC" : "ASC";
    setCategoryDataOrder(newOrder);
  };

  const handleDeleteCategory = (categoryId) => {
    handleDeleteClick(categoryId);
  };
  const handleDeleteSubCategory = (categoryId) => {
    handleDeleteClick(categoryId);
  };
  const getLetterFromIndex = (index) => {
    // Assuming you want to start from 'a'
    return String.fromCharCode(97 + index);
  };

  return (
    <section className="cateogries table__container">
      <table>
        <thead>
          {isPending ? (
            <SmallTablePendingHead />
          ) : (
            <tr>
              <th>SN</th>
              <th>
                Category <LuArrowDownUp onClick={handleCategorySort} />
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
              <>
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
                            type={Model.location.type}
                            placeholder={options.parent}
                            defaultValue={options.parent}
                            value={Model.location.pattern.value}
                            message={Model.location.pattern.message}
                            minLength={Model.location.minLength}
                            minMessage="Category name should be more than 1 characters"
                            maxMessage="Category name should be less than 64 characters"
                            maxLength={Model.location.maxLength}
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
                      <td>{options.parent}</td>
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
                      className={
                        disableButtons
                          ? "small-button__disabled"
                          : "edit__button"
                      }
                      text={<CiEdit />}
                      handleClick={() => handleEditButtonClick(options)}
                      isDisabled={disableButtons ? true : false}
                    />
                    <Button
                      className={
                        disableButtons
                          ? "small-button__disabled delete__button"
                          : "delete__button"
                      }
                      text={<GoTrash />}
                      isDisabled={disableButtons ? true : false}
                      handleClick={() => handleDeleteCategory(options.id)}
                    />
                  </td>
                </tr>

                {showSubCategory && options.id === showSubCategoryDrop ? (
                  options.child.map((subCategory, index) => (
                    <>
                      <tr
                        className={`flexItems ${
                          index === options.child.length - 1 ? "last-child" : ""
                        }`}
                        key={index}
                      >
                        <td>{getLetterFromIndex(index)}</td>
                        {subCategory.id === previousSubCategoryId &&
                        showSubCategoryEdit ? (
                          <td
                            className={
                              showSubCategoryEdit
                                ? "universal__td--border || universal"
                                : ""
                            }
                          >
                            <form
                              onSubmit={handleSubmit(onSubCategoryEditSubmit)}
                              className="universal__update--form"
                            >
                              <div className="universal__input--container">
                                <InputField
                                  name="child"
                                  register={register}
                                  required="Sub Category is required"
                                  errors={errors}
                                  type={Model.department.type}
                                  placeholder={subCategory.category_name}
                                  defaultValue={subCategory.category_name}
                                  value={Model.department.pattern.value}
                                  message={Model.department.pattern.message}
                                  minLength={Model.department.minLength}
                                  minMessage="Sub Category name should be more than 1 characters"
                                  maxMessage="Sub Category name should be less than 64 characters"
                                  maxLength={Model.department.maxLength}
                                  className={
                                    showSubCategoryEdit
                                      ? "universal__table--input || universal2"
                                      : ""
                                  }
                                ></InputField>
                              </div>
                              <div className="universal__FormButton">
                                <Button className="" text={<FaCheck />} />
                                <Button
                                  type="button"
                                  className=""
                                  text={<RxCross1 />}
                                  handleClick={handleSubCategoryCancel}
                                />
                              </div>
                            </form>
                          </td>
                        ) : (
                          <td>{subCategory.category_name}</td>
                        )}
                        <td className="subcategory__button button-gap">
                          <Button
                            className={
                              disableButtons
                                ? "small-button__disabled"
                                : "edit__button"
                            }
                            text={<CiEdit />}
                            isDisabled={disableButtons ? true : false}
                            handleClick={() =>
                              handleSubCategoryEdit(subCategory)
                            }
                          />
                          <Button
                            className={
                              disableButtons
                                ? "small-button__disabled"
                                : "delete__button"
                            }
                            text={<GoTrash />}
                            isDisabled={disableButtons ? true : false}
                            handleClick={() =>
                              handleDeleteSubCategory(subCategory.id)
                            }
                          />
                        </td>
                      </tr>
                    </>
                  ))
                ) : (
                  <></>
                )}
              </>
            ))
          )}
        </tbody>
      </table>
      <CustomToastContainer />
    </section>
  );
};

export default CategoryDataTable;
