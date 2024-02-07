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

const CategoryDataTable = ({ CategoryData }) => {
  const [show, setShow] = useState(false);
  const [showSubCatrgory, setShowSubCatrgory] = useState(false);

  const DeleteCategory = useMutation({
    mutationFn: (parentCategory) => {
      return categoryDelete(parentCategory);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("CategoryData");
    },
    onError: (error) => {
      if (error.response.status === 401) {
        console.log("Unauthorized: Please log in with valid id.");
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
      if (error.response.status === 401) {
        console.log("Unauthorized: Please log in with valid id.");
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

  const handleSubCategoryClick = () => {
    setShowSubCatrgory(true);
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
          <tr>
            <th>
              SN <LuArrowDownUp />
            </th>
            <th>
              Category <LuArrowDownUp />
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {CategoryData.map((options, index) => (
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
                      <IoChevronDown onClick={handleSubCategoryClick} />
                    </button>
                    <button>
                      <IoMdCheckmark />
                    </button>
                    <button type="button" onClick={handleEditCancel}>
                      <RxCross1 />
                    </button>
                  </form>
                </td>
              ) : (
                <td>{options.parent}</td>
              )}
              <td className="button-gap">
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
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default CategoryDataTable;
