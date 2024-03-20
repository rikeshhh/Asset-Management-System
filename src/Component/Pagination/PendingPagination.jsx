import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Pagination.css";
const PendingPagination = () => {
  return (
    <div className="pagination__skeleton">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="pagination__skeleton">
          <p>
            <Skeleton width={30} height={20} />
          </p>
        </div>
      ))}
    </div>
  );
};

export default PendingPagination;
