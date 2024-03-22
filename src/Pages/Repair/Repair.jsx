
import Button from "../../Component/Button/Button";
import { IoMdAdd } from "react-icons/io";
import "./Repair.css";
import { useState } from "react";
import RepairDataTable from "./RepairDataTable";
import Filter from "../../Component/Filter/Filter";
import { Link, useSearchParams } from "react-router-dom";
import ReplaceDataTable from "./ReplaceDataTable";
import FilterRepairReplace from "./FilterRepairReplace";

const Repair = () => {
  const [isCompActive, setIsCompActive] = useState("Repair");
  const [filterShow, setFilterShow] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [pageNumber, setPageNumber] = useState(
    parseInt(params.get("page")) || 1
  );

  const handleButtonClick = () => {
    setIsCompActive((prev) => !prev);
  };

  const onFilterClick = (showHide) => {
    setFilterShow(showHide);
  };

  const filterOptions = ["None", "sent", "pending"];

  return (
    <>
      {filterShow ? (
        <FilterRepairReplace
          handleClick={() => onFilterClick(!filterShow)}
          filterShow={filterShow}
          filterOptions={filterOptions}
          setPageNumber={setPageNumber}
          setSearchParams={setSearchParams}
        />
      ) : (
        <></>
      )}
      <section className="content-wrapper">
        <div className="repair content-radius">
          <div className="content__header repair__header">
            <h2>Repair & Replace</h2>
            <Link to={"/addRepair"} className="link">
              <Button
                text="Send for Repair / Replace"
                className={"category--buttons button__blue"}
                icon={<IoMdAdd />}
              />
            </Link>
          </div>

          <div className="repair__content">
            <div className="repair__navigation">
              <h6
                onClick={() => {
                  setIsCompActive("Repair");
                  setPageNumber(1);
                  const newParam = params.delete("Search");
                  setSearchParams(newParam);
                }}
                className={
                  isCompActive === "Repair"
                    ? "repair-replace__comp active__repair"
                    : "repair-replace__comp"
                }
              >
                Repair
              </h6>
              <h6
                onClick={() => {
                  setIsCompActive("Replace");
                  setPageNumber(1);
                  const newParam = params.delete("Search");
                  setSearchParams(newParam);
                }}
                className={
                  isCompActive === "Replace"
                    ? "repair-replace__comp active__repair"
                    : "repair-replace__comp "
                }
              >
                Replace
              </h6>
            </div>

            {isCompActive === "Repair" ? (
              <RepairDataTable
                filterShow={filterShow}
                onFilterClick={() => onFilterClick(!filterShow)}
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
                params={params}
                setSearchParams={setSearchParams}
                searchParams={searchParams}
              />
            ) : (
              <ReplaceDataTable
                filterShow={filterShow}
                onFilterClick={() => onFilterClick(!filterShow)}
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
                params={params}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Repair;
