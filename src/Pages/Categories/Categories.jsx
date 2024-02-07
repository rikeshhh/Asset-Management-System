import "./Categories.css";
import { useForm } from "react-hook-form";
import { DataTable } from "../../Component/DataTable/DataTable";
import { InputField } from "../../Component/Input/InputField";
import { Label } from "../../Component/Label/Label";
import { SelectInput } from "../../Component/Input/SelectInput";
import Button from "../../Component/Button/Button";
import Model from "../../Component/Model/Model";
import { IoMdAdd } from "react-icons/io";
import { categoryAdd, getCategoryData } from "./CategoryApiSice";
import { useMutation, useQuery } from "@tanstack/react-query";
import CategoryDataTable from "./CategoryDataTable";

const Categories = () => {
  const options = ["Frontend"];
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const {
    isPending,
    error,
    data: CategoryData,
  } = useQuery({
    queryKey: ["CategoryData"],
    queryFn: getCategoryData,
  });

  const onCategorySubmit = (data) => {
    addLocation.mutate(data);
  };

  const addLocation = useMutation({
    mutationFn: (formData) => {
      return categoryAdd(formData.parent);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("CategoryData");
      reset();
    },
    onError: (error) => {
      if (error.response.status === 401) {
        console.log("Unauthorized: Please log in with valid id.");
      }
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <section className="content-wrapper">
      <div className="content-radius category">
        <div className="content__header">
          <h2>Categories</h2>
        </div>
        <div className="category__content">
          <CategoryDataTable CategoryData={CategoryData} />

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
                  name="ChildCategory"
                  register={register}
                  required={Model.Group.required}
                  errors={errors}
                  type={Model.Group.type}
                  placeholder={Model.Group.placeholder}
                  minLength={Model.Group.minLength}
                  maxLength={Model.Group.maxLength}
                />
              </div>
              <div className="add__category--select">
                <Label sup={"*"} text="Parent Category" />
                <SelectInput options={options} />
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
