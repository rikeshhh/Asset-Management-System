import Button from "../../Component/Button/Button";
import { IoMdAdd } from "react-icons/io";
import "./Procurement.css";
import { BsFunnel } from "react-icons/bs";
import { Link, Outlet, useLocation, useSearchParams } from "react-router-dom";
import { SearchInput } from "../../Component/SearchInput/SearchInput";
import ProcurementDataTable from "./ProcurementDataTable";
import { useState } from "react";
import Filter from "../../Component/Filter/Filter";
import FilterProcurement from "./FIlterProcurement";

const Procurement = () => {
  const [filterShow, setFilterShow] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const location = useLocation();

  const [pageNumber, setPageNumber] = useState(
    parseInt(params.get("page")) || 1
  );

  const onFilterClick = (showHide) => {
    setFilterShow(showHide);
  };
  const filterOptions = ["None", "Approved", "Pending"];

  return (
    <>
      {location.pathname === "/procurement" ? (
        <>
          {filterShow ? (
            <FilterProcurement
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
            <div className="content-radius procurement">
              <div className="content__header procurement__header">
                <h2>Procurement </h2>
                <Link to={"/procurement/procurementForm"} className="link">
                  <Button
                    className="button__blue"
                    icon={<IoMdAdd />}
                    text="Fill Procurement"
                  />
                </Link>
              </div>
              <div className="ams__filter ">
                <SearchInput
                  defaultValue={""}
                  setSearchParams={setSearchParams}
                  setPageNumber={setPageNumber}
                />

                <Button
                  text="Filter"
                  icon={<BsFunnel />}
                  className="filter--button"
                  handleClick={() => onFilterClick(!filterShow)}
                />
              </div>
              <ProcurementDataTable
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
                params={params}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </div>
          </section>
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Procurement;
