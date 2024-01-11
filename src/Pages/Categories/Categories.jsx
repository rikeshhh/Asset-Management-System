import { useForm } from "react-hook-form"
import { Category } from "../../Component/CategoryTable/CategoryTable"
import { InputField } from "../../Component/Input/InputField"
import { Label } from "../../Component/Label/Label"
import { SelectInput } from "../../Component/Input/SelectInput"
import './Categories.css'
import Button from "../../Component/Button/Button"

const Categories = () => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm()
  return (
    <section className="content-wrapper">
      <div className="category__content content-radius">
        <div>
        <Category />
        </div>



        <div className="add__category">
          <p>Add a category/ Sub Category</p>
          <span>Add a new category/sub category. Assign a sub category to the parent </span>
          <form action="" onSubmit={handleSubmit()}>
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
            <SelectInput />
           <div>
           <Button text="Add Category" />
           </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Categories