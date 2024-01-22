
export const Label = ({ text, className, sup }) => {
  return (
    <label className={className}>
      {text} <span>{sup}</span>
    </label>
  );
};
