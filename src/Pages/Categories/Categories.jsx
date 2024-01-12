import { useForm } from "react-hook-form"
import { Category } from "../../Component/CategoryTable/CategoryTable"
import { InputField } from "../../Component/Input/InputField"
import { Label } from "../../Component/Label/Label"
import { SelectInput } from "../../Component/Input/SelectInput"
import './Categories.css'
import Button from "../../Component/Button/Button"
import { useState } from "react"


const Categories = () => {
  const [value,setValue] =useState([]);
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
        <h2>Category</h2>
      <div className="category__content content-radius">
        <div>
        <Category value={value} selectedValue={selectedValue}/>
        </div>



        <div className="add__category">
          <p>Add a category/ Sub Category</p>
          <span>Add a new category/sub category. Assign a sub category to the parent </span>
          <form action="" onSubmit={handleSubmit((data)=>setValue(data))}>
            <Label text="Name" />
            <InputField
              placeholder="Enter The name"
              name="Username"
              register={register}
              errors={errors}
              pattern={{
                value: /^[a-zA-Z0-9_]+$/,
                message: 'Invalid username format (alphanumeric characters and underscores)',
              }}
            />
            <Label text="Parent Category" />
            <SelectInput onSelectChange={handleSelectChange}/>
           <div>
           <Button text="Add Category"  className={"user__auth--button"}/>
           </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Categories