import { Link } from "react-router-dom";
import Button from "../../Component/Button/Button";
import { InputField } from "../../Component/Input/InputField";
import { useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import './Assets.css'
import Model from "../../Component/Model/Model";
import { useState } from "react";
import Table from "../../Component/Table/Table";
import { BsFunnel } from "react-icons/bs";

const Assets = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()
  const [isActive, setIsActive] = useState(true);
  const [activeButton, setActiveButton] = useState('hardware');
  const handleButtonClick = () => {
    setIsActive((prev) => !prev);
  };
  return (
    <section className="content-wrapper">
      <div className="assets content-radius">
        <div className="assets__header">
          <h2>Assets</h2>
          <Button text="Add Category" className={"category--buttons"} icon={<IoMdAdd />} />
        </div>




        <div className="assets__navigation">
          <Button text='Hardware' onClick={handleButtonClick}
        isActive={isActive}
          />
          <Button text='Software' onClick={handleButtonClick}
         isActive={!isActive}
           />
        </div>


        <div className="assets__filter ">
          <InputField
            name="Username"
            register={register}
            pattern={Model.Username.pattern}
            required={Model.Username.required}
            errorMessage={Model.Username.errorMessage}
            errors={errors}
            type={Model.Username.type}
            placeholder={Model.Username.placeholder}
            minLength={Model.Username.minLength}
            maxLength={Model.Username.maxLength}
          />
          <Button text='Filter' icon={<BsFunnel />} className='assets__filter__button' />
        </div>
        {isActive && (
          <Table size='8'/>
        )}
      </div>
    </section>
  );
};

export default Assets;
