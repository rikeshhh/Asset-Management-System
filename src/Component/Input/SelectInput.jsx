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
       <option value="None">None</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
