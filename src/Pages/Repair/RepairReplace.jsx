import Button from "../../Component/Button/Button";
import { IoMdAdd } from "react-icons/io";
import "./Repair.css";
import { useState } from "react";
import RepairDataTable from "./RepairDataTable";
import Filter from "../../Component/Filter/Filter";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import ReplaceDataTable from "./ReplaceDataTable";
import FilterRepairReplace from "./FilterRepairReplace";

const RepairReplace = () => {
  const location = useLocation();

  const [isCompActive, setIsCompActive] = useState(
    location.pathname.includes("replace") ? "Replace" : "Repair"
  );
  const [filterShow, setFilterShow] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [pageNumber, setPageNumber] = useState(
    parseInt(params.get("page")) || 1
  );

  // Define state to manage the active button (e.g., hardware, software, etc.)

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
          pageNumber={pageNumber}
        />
      ) : (
        <></>
      )}
      <section className="content-wrapper">
        <div className="repair content-radius">
          <div className="content__header repair__header">
            <h2>Repair & Replace</h2>
            <Link to={"/repair/addRepair"} className="link">
              <Button
                text="Send for Repair / Replace"
                className={"category--buttons button__blue"}
                icon={<IoMdAdd />}
              />
            </Link>
          </div>

          <div className="repair__content">
            <div className="repair__navigation">
              <NavLink
                to="/repair/repair"
                onClick={() => {
                  setIsCompActive("Repair");
                  setPageNumber(1);
                }}
                className={
                  isCompActive === "Repair"
                    ? "repairReplace__active"
                    : "repairReplace__inactive"
                }
              >
                <Button text="Repair" className="assets__btn" />
              </NavLink>
              <NavLink
                to="/repair/replace"
                onClick={() => {
                  setIsCompActive("Replace");
                  setPageNumber(1);
                }}
                // className={
                //   isCompActive === "Replace"
                //     ? "repair-replace__comp active__repair"
                //     : "repair-replace__comp "
                // }
                className={
                  isCompActive === "Replace"
                    ? "repairReplace__active"
                    : "repairReplace__inactive"
                }
              >
                <Button text="Replace" className="assets__btn" />
              </NavLink>
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

export default RepairReplace;
