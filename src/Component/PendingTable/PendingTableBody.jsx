import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
/**
 * Renders the pending state of a table body with skeleton loading components.
 * @returns {JSX.Element} JSX element representing the pending table data with custom height and width.
 */

const PendingTableBody = () => {
  return (
    <>
      {Array.from({ length: 7 }).map((_, index) => (
        <tr key={index}>
          <td>
            <Skeleton width={127} height={10} />
          </td>
          <td>
            <Skeleton width={209} height={10} />
          </td>
          <td>
            <Skeleton width={100} height={10} />
          </td>
          <td>
            <Skeleton width={84} height={10} />
          </td>
          <td>
            <Skeleton width={131} height={10} />
          </td>
          <td>
            <Skeleton width={130} height={10} />
          </td>
          <td>
            <Skeleton width={125} height={10} />
          </td>
        </tr>
      ))}
    </>
  );
};

export default PendingTableBody;
