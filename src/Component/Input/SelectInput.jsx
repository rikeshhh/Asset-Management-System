import "./input.css";
export const SelectInput = ({ onChange, isDisabled, defaultValue }) => {
  return (
    <select
      // value={options.value}
      onChange={onChange}
      disabled={isDisabled}
      className={isDisabled ? "select__disabled" : "select__enabled"}
      required
    >
      <option className="select__option" value={null}>
        {defaultValue || "none"}
      </option>
      {/* {options.map((option, index) => (
        <option className="select__option" key={index} value={option.assets_type}>
          {option.assets_type}
        </option>
      ))} */}
    </select>
  );
};
