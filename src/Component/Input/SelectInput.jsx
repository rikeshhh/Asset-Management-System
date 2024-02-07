import "./input.css";
export const SelectInput = ({ onChange, isDisabled, options }) => {
  return (
    <select
      value={options.value}
      onChange={onChange}
      disabled={isDisabled}
      className={isDisabled ? "select__disabled" : "select__enabled"}
      required
    >
      <option className="select__option" value="none" defaultValue={"None"}>
        None
      </option>
      {options.map((option, index) => (
        <option className="select__option" key={index} value={option.value}>
          {option.options}
        </option>
      ))}
    </select>
  );
};
