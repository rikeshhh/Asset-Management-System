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
      {defaultValue ? (
        <option value={defaultValue}>{defaultValue}</option>
      ) : (
        <></>
      )}
      {option.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
