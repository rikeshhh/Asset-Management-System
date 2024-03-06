import "./input.css";
export const SelectInput = ({
  options,
  isDisabled,
  defaultValue,
  register,
  name,
}) => {
  return (
    <select
      options={options}
      disabled={isDisabled}
      className={isDisabled ? "select__disabled" : "select__enabled"}
      {...register(name, { required: true })}
    >
      <option className="select__option" value={null}>
        {defaultValue || "None"}
      </option>
      {options.map((option, index) => (
        <option className="select__option" key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
