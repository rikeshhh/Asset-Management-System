export const Label = ({ text, className, sup }) => {
  return (
    <label className={className}>
      {text} <span style={{ color: "#E03137" }}>{sup}</span>
    </label>
  );
};
