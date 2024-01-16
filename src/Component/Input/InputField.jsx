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
              value: minLength.value,
              message: minLength.errorMessage,
            },
          maxLength: !isDisabled &&
            maxLength && {
              value: maxLength.value,
              message: maxLength.errorMessage,
            },
        })}
        disabled={isDisabled}
      />
      {!isDisabled && errors[name] && (
        <p className="error-message">{errors[name].message}</p>
      )}
    </>
  );
};
