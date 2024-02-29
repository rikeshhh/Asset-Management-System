// Pagination.jsx
import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import "./Pagination.css";
import { useQuery } from "@tanstack/react-query";
import { getPaginationData } from "./PaginationApiSlice";
import AssetsTableData from "../../Pages/Assets/AssetsTableData";

const Pagination = ({ assets_type, asssets_data, searchAssets, isPending }) => {
  const [page, setPage] = useState(1);
  const [paginationData, setPaginationData] = useState(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["exampleQuery", page],
    queryFn: () => getPaginationData(page, assets_type),
    staleTime: 10000,
    // Other options...
  });
  const handlePrevClick = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (error) {
    console.log(error);
  }

  return (
    <>
      <AssetsTableData
        // handleDeleteClick={handleDeleteClick}
        // handleProceedClick={handleProceedClick}
        tableData={searchAssets ? data : asssets_data}
        isPending={isPending}
        assets_type="hardware"
      />
      <div className="pagination-container">
        <Button
          className="pagination--button"
          text="prev"
          handleClick={handlePrevClick}
          disabled={page === 1}
        />
        <div>{page}</div>
        <Button
          className="pagination--button"
          text="next"
          handleClick={handleNextClick}
        />
      </div>
    </>
  );
};

export default Pagination;
