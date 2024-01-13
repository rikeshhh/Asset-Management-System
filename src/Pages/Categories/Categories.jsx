import { useForm } from "react-hook-form"
import { Category } from "../../Component/CategoryTable/CategoryTable"
import { InputField } from "../../Component/Input/InputField"
import { Label } from "../../Component/Label/Label"
import { SelectInput } from "../../Component/Input/SelectInput"
import './Categories.css'
import Button from "../../Component/Button/Button"
import Model from "../../Component/Model/Model"
import { useState } from "react"
import { IoMdAdd } from "react-icons/io";

const Categories = () => {
  
  const [value, setValue] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()
  return (
    <section className="content-wrapper">
      <div className="content-radius">
        <div className="category">
   <div className="category__header">
    <h2>Categories</h2>
   </div>
<div className="category__content">

          <Category value={value} selectedValue={selectedValue} />
     
        <div className="add__category">
          <p>Add a category/ Sub Category</p>
          <span>Add a new category/sub category. Assign a sub category to the parent </span>
          <form action="" onSubmit={handleSubmit((data) => setValue(data))} > 
            <Label text="Name" />
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
            <Label text="Parent Category" />
            <SelectInput onSelectChange={handleSelectChange} />
            <div className="">
            <Button text="Add Category" className={"category--buttons"} icon={<IoMdAdd/>}/>
            </div>
          </form>
        </div>
      </div>
</div>
        </div>
    </section>
  )
}
export default Categories