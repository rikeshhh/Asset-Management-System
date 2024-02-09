import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const PendingTableBody = () => {
  return (
    <>
      {Array.from({ length: 20 }).map((_, index) => (
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
