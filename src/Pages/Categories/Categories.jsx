import "./Categories.css";
import { useForm } from "react-hook-form";
import { InputField } from "../../Component/Input/InputField";
import { Label } from "../../Component/Label/Label";
import Button from "../../Component/Button/Button";
import Model from "../../Component/Model/Model";
import { IoMdAdd } from "react-icons/io";
import {
  categoryDelete,
  getCategoryData,
  parentCategoryAdd,
  subCategoryAdd,
} from "./CategoryApiSice";
import { useMutation, useQuery } from "@tanstack/react-query";
import CategoryDataTable from "./CategoryDataTable";
import { notifyError, notifySuccess } from "../../Component/Toast/Toast";
import { queryClient } from "../../Component/Query/Query";
import SelectInputCategory from "./SelectInputCategory";
import { DeleteConfirmation } from "../../Component/DeleteConfirmation/DeleteConfirmation";
import { useState } from "react";

/**
 * Component for managing and displaying categories and subcategories.
 * Allows users to add new categories and subcategories, and view existing ones.
 * @returns {JSX.Element} The JSX representation of the component.
 */

const Categories = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      category_name: "",
    },
  });

  const [categoryDataOrder, setCategoryDataOrder] = useState("ASC");

  /**
   * Query to get category data.
   */

  const {
    isPending,
    error,
    data: CategoryData,
  } = useQuery({
    queryKey: ["CategoryData", categoryDataOrder],
    queryFn: () => getCategoryData(categoryDataOrder),
  });

  /**
   * Mutation for adding a new parent category.
   */

  const addParentCategory = useMutation({
    mutationFn: (formData) => {
      return parentCategoryAdd(formData);
    },
    onSuccess: () => {
      notifySuccess("Category has been added");
      queryClient.invalidateQueries("CategoryData");
      reset();
    },
    onError: (error) => {
      notifyError(error.message);
    },
  });
  /**
   * Mutation for adding a new subcategory.
   */
  const addSubCategory = useMutation({
    mutationFn: (formData) => {
      return subCategoryAdd(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("CategoryData");
      notifySuccess("Sub Category has been added");
      reset();
    },
    onError: (error) => {
      notifyError(error.message);
    },
  });

  /**
   * Handles the form submission for adding a new category or subcategory.
   * @param {Object} data - Form data submitted by the user.
   */

  const onCategorySubmit = (data) => {
    if (data.select_category === "None") {
      addParentCategory.mutate(data);
    } else {
      addSubCategory.mutate(data);
    }
    reset();
  };

  const deleteMessage = "Category/Subcategory has been deleted";
  const DeleteCategory = useMutation({
    mutationFn: (categoryId) => {
      return categoryDelete(categoryId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("CategoryData");
      notifySuccess(deleteMessage);
    },
    onError: (error) => {
      if (error.response.status === 401) {
        notifyError("Error deleting category");
      }
    },
  });

  const [categoryId, setCategoryId] = useState();
  const [disableButtons, setDisableButtons] = useState(false);
  const [deleteConfirmationShow, setDeleteConfirmationShow] = useState(false);

  const handleCancelClick = () => {
    setDeleteConfirmationShow(false);
  };
  const handleProceedClick = () => {
    DeleteCategory.mutate(categoryId);
    setDeleteConfirmationShow(false);
  };
  const handleDeleteClick = (categoryId) => {
    setDeleteConfirmationShow(true);
    setCategoryId(categoryId);
  };

  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      {deleteConfirmationShow ? (
        <DeleteConfirmation
          deleteName="category/subcategory"
          handleCancelClick={handleCancelClick}
          handleProceedClick={handleProceedClick}
        />
      ) : (
        <></>
      )}
      <section className="content-wrapper">
        <div className="content-radius category">
          <div className="content__header">
            <h2>Categories</h2>
          </div>
          <div className="category__content">
            <CategoryDataTable
              setCategoryDataOrder={setCategoryDataOrder}
              categoryDataOrder={categoryDataOrder}
              setDisableButtons={setDisableButtons}
              disableButtons={disableButtons}
              CategoryData={CategoryData}
              isPending={isPending}
              handleDeleteClick={handleDeleteClick}
              handleProceedClick={handleProceedClick}
            />

            <div className="add__category">
              <div className="add__category--title">
                <p>Add a category/ Sub Category</p>
                <span>
                  Add a new category / sub category. Assign sub category to a
                  parent category.
                </span>
              </div>
              <form action="" onSubmit={handleSubmit(onCategorySubmit)}>
                <div>
                  <Label sup={"*"} text="Name" />
                  <InputField
                    name="category_name"
                    register={register}
                    required={Model.Category.required}
                    errors={errors}
                    type={Model.Category.type}
                    placeholder={Model.Category.placeholder}
                    minLength={Model.Category.minLength}
                    maxLength={Model.Category.maxLength}
                    autoComplete={"off"}
                    defaultValue={""}
                  />
                </div>
                <div className="add__category--select">
                  <Label sup={"*"} text="Parent Category" />
                  <SelectInputCategory
                    name={"select_category"}
                    register={register}
                    defaultValue={""}
                  />
                </div>
                <div className="add__category--right">
                  <Button
                    text="Add Category"
                    type="submit"
                    className={
                      disableButtons
                        ? "category__button--disabled"
                        : " button__blue "
                    }
                    icon={<IoMdAdd />}
                    isDisabled={disableButtons ? true : false}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Categories;
