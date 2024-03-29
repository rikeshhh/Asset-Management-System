import "./EmptyData.css";

export const EmptyData = () => {
  return (
    <tr>
      <td colSpan="8" className="empty-table-cell">
        <div className="empty-table-message">
          <p className="">No data available</p>
        </div>
      </td>
    </tr>
  );
};
