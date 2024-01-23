import React from 'react'
import { InputField } from '../Input/InputField'
import { useForm } from 'react-hook-form';
import Model from '../Model/Model';
import Button from '../Button/Button';
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import './editData.css'

const EditData = ({ value,   }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log('User input:', data);
    setFormDataArray((prevDataArray) => [...prevDataArray, data]);
  };
  return (
    <form className='editData' onSubmit={handleSubmit(onSubmit)}>
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
      <div className="category__buttons">
        <Button className="edit__button" type='submit' text={<CiEdit />} />
        <Button className="delete__button" text={<GoTrash />} />
      </div>
    </form>
  )
}

export default EditData