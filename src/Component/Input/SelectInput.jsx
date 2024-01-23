import "./input.css";
export const SelectInput = ({  value, onChange ,isDisabled, options }) => {
  return (
    <select
    value={value}
     onChange={onChange}
      disabled={isDisabled}
      className={isDisabled ? "select__disabled" : "select__enabled"}
      required
    >
      <option value="" defaultValue={"None"}>
        None
      </option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
