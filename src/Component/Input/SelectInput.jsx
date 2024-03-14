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
    <select {...register(name, { required: true })}>
      <option value={null}>
        None
      </option>
      {option.map((options, index) => (
        <option key={index} value={options}>
          {options}
        </option>
      ))}
    </select>
  );
};
