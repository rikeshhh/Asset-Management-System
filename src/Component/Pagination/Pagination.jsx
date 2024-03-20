import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Button from "../Button/Button";
import { useState } from "react";

const Pagination = ({
  data,
  params,
  searchParams,
  setSearchParams,
  roundUp,
  pageNumber,
  setPageNumber,
}) => {
  const [pageNumberForEllipsis, setPageNumberForEllipsis] = useState(null);

  const updatePageNumber = (newPageNumber) => {
    // Set the new page number
    setPageNumber(newPageNumber);
    // Update the URL with the new page number
    setSearchParams({ page: newPageNumber });
  };

  return (
    <div className="pagination">
      <Button
        className="inactivePage"
        icon={<FaAngleLeft />}
        handleClick={() =>
          updatePageNumber(pageNumber > 1 ? pageNumber - 1 : 1)
        }
      />
      {data &&
        [...Array(roundUp)].map((_, index) => (
          <>
            {index === roundUp - 2 && pageNumber > 2 ? (
              <Button
                key={index}
                text={
                  pageNumberForEllipsis !== null
                    ? pageNumberForEllipsis.toString()
                    : "..."
                }
                className={
                  pageNumber === index + 1 ? "activePage" : "inactivePage"
                }
                handleClick={() => {
                  updatePageNumber(index + 1);
                  setPageNumberForEllipsis(index + 1);
                }}
              />
            ) : (
              <Button
                key={index}
                text={index + 1}
                className={
                  pageNumber === index + 1 ? "activePage" : "inactivePage"
                }
                handleClick={() => updatePageNumber(index + 1)}
              />
            )}
          </>
        ))}
      <Button
        className="inactivePage"
        handleClick={() =>
          updatePageNumber(pageNumber < roundUp ? pageNumber + 1 : pageNumber)
        }
        icon={<FaAngleRight />}
      />
    </div>
  );
};

export default Pagination;
