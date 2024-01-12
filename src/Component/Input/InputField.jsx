import { useForm } from "react-hook-form";
import "./input.css";
export const InputField = ({
  className,
  placeholder,
  name,
  type,
  register,
  errors,
  isDisabled,
  pattern = null,
  fieldName = null,
  rule,
}) => {
  return (
    <>
      <input
        placeholder={placeholder}
        className={className}
        name={name}
        type={type === "password" ? "password" : "text"}
        disabled={isDisabled}
        {...register(fieldName, {
          required: rule.required && rule.errorMessage,
          pattern: rule.type !== "password" &&
            rule.pattern && {
              value: new RegExp(rule.pattern.value),
              message: rule.pattern.message,
            },
          minLength: rule.minLength && {
            value: rule.minLength,
            message: rule.errorMessage,
          },
          maxLength: rule.maxLength && {
            value: rule.maxLength,
            message: rule.errorMessage,
          },
        })}
      />
      {errors[fieldName] && (
        <p className="error-message">
          {errors[fieldName].message || rule.errorMessage}
        </p>
      )}
    </>
  );
};
