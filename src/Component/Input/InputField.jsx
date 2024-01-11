import { useForm } from 'react-hook-form'
import './input.css'
export const InputField = ({
  className,
  placeholder,
  name,
  register,
  errors,
  isDisabled,
  pattern =null
}) => {
  return (
    <>
      <input

        placeholder={placeholder}
        className={className}
        name={name}
        type={name}
        disabled={isDisabled}
        {...register(name, {
          required: `${name} is required`,
          pattern,

        }
        )}
      />
      {errors && errors[name] && (
        <p className="error-message">{errors[name].message}</p>
      )}
    </>
  )
}



