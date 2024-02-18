import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/**
 * Renders the pending state of a table header with skeleton loading components.
 * @returns {JSX.Element} JSX element representing the pending table header with custom height and width.
 */

const PendingTableHead = () => {
  return (
    <>
      <tr>
        <th>
          <Skeleton width={127} height={10} />
        </th>
        <th>
          <Skeleton width={209} height={10} />
        </th>
        <th>
          <Skeleton width={100} height={10} />
        </th>
        <th>
          <Skeleton width={84} height={10} />
        </th>
        <th>
          <Skeleton width={131} height={10} />
        </th>
        <th>
          <Skeleton width={130} height={10} />
        </th>
        <th>
          <Skeleton width={125} height={10} />
        </th>
      </tr>
    </>
  );
};

export default PendingTableHead;
