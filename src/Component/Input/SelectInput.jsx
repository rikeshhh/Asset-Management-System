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
  console.log(defaultValue);
  return (
    <select {...register(name, { required: true })}>
      {option.map((option, index) => (
        <option key={index} value={defaultValue}>
          {option}
        </option>
      ))}
    </select>
  );
};
