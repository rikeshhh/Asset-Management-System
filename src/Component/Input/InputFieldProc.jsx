import { ErrorMessage } from "@hookform/error-message";
import "./input.css";
import { useState } from "react";

// The InputFieldProc component is created to handle input fields specifically for procurement table items.
// It includes functionality to clear errors on change, ensuring that errors are not carried over between input fields.
// Separating this functionality into a separate component prevents unintended interactions with other input fields.

export const InputFieldProc = ({
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
  className,
  defaultValue,
  handleclick,
  checked,
  isEditable = true,
  clearErrors,
}) => {
  const hasError = errors[name];
  const [inputValu, setInputValu] = useState(defaultValue);
  // Handle change event
  const handleChange = (e) => {
    const inputValue = e.target.value;
    setInputValu(inputValue);
    clearErrors(name);
  };
  return (
    <div className={"input__field"}>
      <div className="toggle__showHide--container">
        <input
          onClick={handleclick}
          className={`${isDisabled ? "input-disabled" : "input-enabled"} ${
            hasError ? "input__error" : ""
          } ${className} `}
          name={name}
          placeholder={placeholder}
          type={type}
          {...register(name, {
            value: inputValu,
            onChange: handleChange,
            required: required,
            pattern: {
              value: new RegExp(value),
              message: message,
            },
            minLength: !isDisabled && {
              value: minLength,
              message: minMessage,
            },
            maxLength: !isDisabled && {
              value: maxLength,
              message: maxMessage,
            },
          })}
          disabled={isDisabled}
          readOnly={!isEditable}
          checked={checked}
        />
      </div>
      {!isDisabled && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) =>
            message && (
              <p className="error-message proc__error" key={type}>
                {message}
              </p>
            )
          }
        />
      )}
      {!isDisabled && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ minMessage }) =>
            minMessage && (
              <p className="error-message proc__error" key={type}>
                {minMessage}
              </p>
            )
          }
        />
      )}
      {!isDisabled && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ maxMessage }) =>
            maxMessage && (
              <p className="error-message proc__error" key={type}>
                {maxMessage}
              </p>
            )
          }
        />
      )}
    </div>
  );
};
