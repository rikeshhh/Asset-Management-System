import "./input.css";
export const SelectInput = ({
  onChange,
  isDisabled,
  defaultValue,
  register,
  option,
  name,
  value,
}) => {
  return (
    <select
      style={{ textTransform: "capitalize" }}
      {...register(name, { required: true })}
      className={`${isDisabled ? "input-disabled" : "input-enabled"}`}
      disabled={isDisabled}
    >
      {/* {defaultValue ? (
        <option value={defaultValue}>{defaultValue}</option>
      ) : (
        <></>
      )} */}
      {option.map((option, index) => (
        <option
          selected={option === defaultValue ? true : false}
          key={index}
          value={option}
        >
          {option}
        </option>
      ))}
    </select>
  );
};
