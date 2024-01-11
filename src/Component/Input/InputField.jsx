import { useForm } from 'react-hook-form'
import './input.css'
export const InputField = ({
  className,
  placeholder,
  name,
  register,
  errors,
  pattern = null }) => {
  return (
    <>
      <input

        placeholder={placeholder}
        className={className}
        name={name}
        type={name}
        {...register(name, {
          required: `${name} is required`,
          pattern,
          minLength: 6,
           maxLength: 12
        }
        )}
      />
      {errors && errors[name] && (
        <p className="error-message">{errors[name].message}</p>
      )}
    </>
  )
}



