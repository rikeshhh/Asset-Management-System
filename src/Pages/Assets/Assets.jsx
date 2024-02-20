import "./Assets.css";
import { Link } from "react-router-dom";
import Button from "../../Component/Button/Button";
import { useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import { BsFunnel } from "react-icons/bs";
import Filter from "../../Component/Filter/Filter";
import { SearchInput } from "../../Component/SearchInput/SearchInput";
import AssetsTableData from "./AssetsTableData";

const Assets = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [isActive, setIsActive] = useState(true);

  const [activeButton, setActiveButton] = useState("hardware");

  const handleButtonClick = () => {
    setIsActive((prev) => !prev);
  };

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
        <div className="assets content-radius">
          <div className="content__header assets__header">
            <h2>Assets</h2>
            <Link to="/addAssets" className="link">
              <Button
                text="Add an Asset"
                className={"button__blue"}
                icon={<IoMdAdd />}
              />
            </Link>
          </div>

          <div className="assets__content">
            <div className="assets__navigation">
              <Button
                text="Hardware"
                onhandle={handleButtonClick}
                isActive={isActive}
                className="assets__btn"
              />
              <Button
                text="Software"
                onhandle={handleButtonClick}
                isActive={!isActive}
                className="assets__btn"
              />
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
            {isActive && <AssetsTableData linkTo={"/editAssets"} size="8" />}
          </div>
        </div>
      </section>
    </>
  );
};

export default Assets;
