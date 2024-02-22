import Button from "../../Component/Button/Button";
import { IoMdAdd } from "react-icons/io";
import "./Procurement.css";
import { BsFunnel } from "react-icons/bs";
import { Link } from "react-router-dom";
import { SearchInput } from "../../Component/SearchInput/SearchInput";
import ProcurementDataTable from "./ProcurementDataTable";
import { useState } from "react";
import Filter from "../../Component/Filter/Filter";

const Procurement = () => {
  const [filterShow, setFilterShow] = useState(false);

  const onFilterClick = (showHide) => {
    setFilterShow(showHide);
  };
  return (
    <>
      {filterShow ? (
        <Filter
          handleClick={() => onFilterClick(!filterShow)}
          filterShow={filterShow}
        />
      ) : (
        <></>
      )}
      <section className="content-wrapper">
        <div className="content-radius procurement">
          <div className="content__header procurement__header">
            <h2>Procurement </h2>
            <Link to={"/procurementForm"} className="link">
              <Button
                className="button__blue"
                icon={<IoMdAdd />}
                text="Fill Procurement"
              />
            </Link>
          </div>
          <div className="ams__filter ">
            <SearchInput />

            <Button
              text="Filter"
              icon={<BsFunnel />}
              className="filter--button"
              handleClick={() => onFilterClick(!filterShow)}
            />
          </div>
          <div className="procurement__table">
            <ProcurementDataTable />
          </div>
        </div>
      </section>
    </>
  );
};

export default Procurement;
