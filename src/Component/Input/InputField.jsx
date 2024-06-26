import { ErrorMessage } from "@hookform/error-message";
import "./input.css";
import { useState } from "react";

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
  className,
  showPassword,
  visiblePasswordFn,
  autoComplete,
  children,
  defaultValue,
  handleclick,
  checked,
  isEditable = true,
}) => {
  const hasError = errors[name];
  const [inputValu, setInputValu] = useState(defaultValue);
  // Handle change event
  const handleChange = (e) => {
    const inputValue = e.target.value;
    setInputValu(inputValue);
  };
  return (
    <div className={type == "radio" ? "input__field--radio" : "input__field"}>
      <div className="toggle__showHide--container">
        <input
          onClick={handleclick}
          className={`${isDisabled ? "input-disabled" : "input-enabled"} ${
            hasError ? "input__error" : ""
          } ${hasError && type == "radio" ? "input__radio" : ""} ${className} `}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          type={showPassword ? "text" : type}
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
        {children && (
          <div className="password-toggle-button" onClick={visiblePasswordFn}>
            {children}
          </div>
        )}
      </div>
      {!isDisabled && (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) =>
            message && (
              <p className="error-message" key={type}>
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
              <p className="error-message" key={type}>
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
              <p className="error-message" key={type}>
                {maxMessage}
              </p>
            )
          }
        />
      )}
    </div>
  );
};
