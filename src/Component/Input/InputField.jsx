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
  className,
<<<<<<< HEAD
  showPassword,
  visiblePasswordFn,
  children
=======
  dataValue
>>>>>>> 9b31d521bfe38c2538d0d6800299bc96d8e11407
}) => {
  const hasError = errors[name];


  return (
    <div className={type == "radio" ? "input__field--radio" : "input__field"}>
      <input
        className={`${isDisabled ? "input-disabled" : "input-enabled"} ${
          hasError ? "input__error" : ""
        } ${hasError && type == "radio" ? "input__radio" : ""} ${className}`}
        placeholder={placeholder}
        name={name}
<<<<<<< HEAD
        type={showPassword?'text':type}
=======
        type={type}
        value={dataValue}
>>>>>>> 9b31d521bfe38c2538d0d6800299bc96d8e11407
        {...register(name, {
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
      />
      {children && (
        <div className="password-toggle-button" onClick={visiblePasswordFn}>
          {children}
        </div>
      )}

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