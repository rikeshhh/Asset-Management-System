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
