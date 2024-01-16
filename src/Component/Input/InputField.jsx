import { ErrorMessage } from "@hookform/error-message";
import "./input.css";

export const InputField = ({
  placeholder,
  name,
  type,
  required,
  errors,
  message,
  value,
  maxLength,
  minLength,
  maxMessage,
  minMessage,
  isDisabled,
  register,
}) => {
  return (
    <>
      <input
        className={isDisabled ? "input-disabled" : "input-enabled"}
        placeholder={placeholder}
        name={name}
        type={type}
        {...register(name, {
          required: required,
          pattern: {
            value: new RegExp(value),
            message: message,
          },
          minLength: !isDisabled &&
            minLength && {
              value: minLength,
              message: minMessage,
            },
          maxLength: !isDisabled && {
            value: maxLength,
            message: maxMessage,
          },
        })}
        disabled={isDisabled}
      />
      {!isDisabled && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => message && <p key={type}>{message}</p>}
        />
      )}
    </>
  );
};
