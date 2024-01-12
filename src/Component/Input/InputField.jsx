import { useForm } from "react-hook-form";
import "./input.css";
export const InputField = ({
  placeholder,
  name,
  type, 
  register,
  required,
  errors,
  errorMessage,
  pattern = null,
  maxLength,
  minLength,
  isDisabled
}) => {
  console.log(isDisabled)
  return (
    <>
    <input
  placeholder={placeholder}
  name={name}
  type={type}
  {...register(name, {
    required: required,
    pattern: type !== "password" &&
      pattern && {
        value: new RegExp(pattern.value),
        message: pattern.message,
      },
    minLength: minLength && {
      value: minLength.minLength,
      message: minLength.errorMessage,
    },
    maxLength: maxLength && {
      value: maxLength.maxLength,
      message: maxLength.errorMessage,
    },
  })}
  disabled={isDisabled}
/>
   {errors[name] && <p className='error-message'>{errors[name].message || errors[name].errorMessage}</p>}
    </>
  );
};
