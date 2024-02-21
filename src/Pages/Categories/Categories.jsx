import "./Categories.css";
import { useForm } from "react-hook-form";
import { InputField } from "../../Component/Input/InputField";
import { Label } from "../../Component/Label/Label";
import Button from "../../Component/Button/Button";
import Model from "../../Component/Model/Model";
import { IoMdAdd } from "react-icons/io";
import {
  getCategoryData,
  getSubCategoryData,
  parentCategoryAdd,
  subCategoryAdd,
} from "./CategoryApiSice";
import { useMutation, useQuery } from "@tanstack/react-query";
import CategoryDataTable from "./CategoryDataTable";
import { notifyError } from "../../Component/Toast/Toast";
import { queryClient } from "../../Component/Query/Query";
import SelectInputCategory from "./SelectInputCategory";
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
  } = useForm();

  /**
   * Query to get category data.
   */

  const {
    isPending,
    error,
    data: CategoryData,
  } = useQuery({
    queryKey: ["CategoryData"],
    queryFn: getCategoryData,
  });

  /**
   * Query to get subcategory data.
   */

  const { data: SubCategoryData } = useQuery({
    queryKey: ["SubCategoryData"],
    queryFn: getSubCategoryData,
  });

  /**
   * Handles the form submission for adding a new category or subcategory.
   * @param {Object} data - Form data submitted by the user.
   */
  const onCategorySubmit = (data) => {
    if (data.parent === "None") {
      addParentCategory.mutate(data);
    } else {
      addSubCategory.mutate(data);
    }
  };

  /**
   * Mutation for adding a new parent category.
   */

  const addParentCategory = useMutation({
    mutationFn: (formData) => {
      return parentCategoryAdd(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("CategoryData");
      reset();
    },
    onError: (error) => {
      notifyError(error.message);
      if (error.response.status === 401) {
        notifyError("Unauthorized: Please log in with valid id.");
      }
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
      queryClient.invalidateQueries("SubCategoryData");
      reset();
    },
    onError: (error) => {
      notifyError(error.message);
      if (error.response.status === 401) {
        notifyError("Unauthorized: Please log in with valid id.");
      }
    },
  });

  if (CategoryData) {
    const data = CategoryData.map((item) => item);
    const uniqueParents = Array.from(new Set(data.map((item) => item.parent)));
    // setUniqueparent(uniqueParents);
  }

  if (error) return "An error has occurred: " + error.message;
  return (
    <section className="content-wrapper">
      <div className="content-radius category">
        <div className="content__header">
          <h2>Categories</h2>
        </div>
        <div className="category__content">
          <CategoryDataTable
            CategoryData={CategoryData}
            isPending={isPending}
            SubCategoryData={SubCategoryData}
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
                  required={Model.Group.required}
                  errors={errors}
                  type={Model.Group.type}
                  placeholder={Model.Group.placeholder}
                  minLength={Model.Group.minLength}
                  maxLength={Model.Group.maxLength}
                  autoComplete={"off"}
                />
              </div>
              <div className="add__category--select">
                <Label sup={"*"} text="Parent Category" />
                <SelectInputCategory register={register} />
              </div>
              <div className="">
                <Button
                  text="Add Category"
                  type="submit"
                  className={"category--button button__blue"}
                  icon={<IoMdAdd />}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Categories;
