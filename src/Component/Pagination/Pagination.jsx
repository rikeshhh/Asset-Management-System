import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Button from "../Button/Button";
import { useState } from "react";
import "../../App.css";
const Pagination = ({
  data,
  setSearchParams,
  roundUp,
  pageNumber,
  setPageNumber,
}) => {
  const [pageNumberForEllipsis, setPageNumberForEllipsis] = useState(null);
  const [showPages, setShowPages] = useState(false);

  const updatePageNumber = (newPageNumber) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPageNumber);
    const updatedParams = {};
    for (const [key, value] of params.entries()) {
      updatedParams[key] = value;
    }
    setPageNumber(newPageNumber);
    setSearchParams(updatedParams);
  };

  const toggleShowPages = () => {
    setShowPages((prev) => !prev);
  };

  const handleEllipsisClick = (pageNumber) => {
    setPageNumberForEllipsis(pageNumber);
    toggleShowPages();
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
      {pageNumber > 4 && !showPages && (
        <>
          <Button
            key={1}
            text={1}
            className={pageNumber === 1 ? "activePage" : "inactivePage"}
            handleClick={() => updatePageNumber(1)}
          />
          <Button
            text={"..."}
            className="inactivePage"
            handleClick={() => updatePageNumber(1)}
          />
        </>
      )}
      {[...Array(roundUp)].map((_, index) => {
        if (
          (index === 0 || index === 1) &&
          (pageNumber > 3 || showPages)
        ) {
          return null;
        }
        if (
          (index === roundUp - 1 || index === roundUp - 2) &&
          (pageNumber < roundUp - 2 || showPages)
        ) {
          return null;
        }
        if (
          !showPages &&
          index >= pageNumber - 2 &&
          index <= pageNumber + 2
        ) {
          return (
            <Button
              key={index}
              text={index + 1}
              className={
                pageNumber === index + 1 ? "activePage" : "inactivePage"
              }
              handleClick={() => updatePageNumber(index + 1)}
            />
          );
        }
        if (
          showPages &&
          index >= pageNumber - 2 &&
          index <= pageNumber + 2 &&
          index < roundUp - 3
        ) {
          return (
            <Button
              key={index}
              text={index + 1}
              className={
                pageNumber === index + 1 ? "activePage" : "inactivePage"
              }
              handleClick={() => updatePageNumber(index + 1)}
            />
          );
        }
        return null;
      })}
      {pageNumber < roundUp - 2 && (
        <>
          <Button
            text={"..."}
            className="inactivePage"
            handleClick={() => handleEllipsisClick(pageNumber + 1)}
          />
          <Button
            key={roundUp}
            text={roundUp}
            className={pageNumber === roundUp ? "activePage" : "inactivePage"}
            handleClick={() => updatePageNumber(roundUp)}
          />
        </>
      )}
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


