import { DeleteConfirmation } from "../../Component/DeleteConfirmation/DeleteConfirmation";

/**
 * React component representing the display of subcategories.
 * @param {Object} props - Component props.
 * @param {Array} props.SubCategoryData - Array of subcategory data.
 * @returns {JSX.Element} JSX element representing the SubCategory component.
 */
const SubCategory = ({ SubCategoryData }) => {
  return (
    <>
      {SubCategoryData.map((subcategory, index) => (
        <td>{subcategory.category_name}</td>
      ))}
    </>
  );
};

export default SubCategory;
