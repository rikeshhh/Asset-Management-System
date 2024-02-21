import Button from "../../Component/Button/Button";
import { InputField } from "../../Component/Input/InputField";
import { useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import "./Repair.css";
import Model from "../../Component/Model/Model";
import { useState } from "react";
import { BsFunnel } from "react-icons/bs";
import RepairDataTable from "./RepairDataTable";
import Filter from "../../Component/Filter/Filter";
import { SearchInput } from "../../Component/SearchInput/SearchInput";

const Repair = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [isActive, setIsActive] = useState(true);
  const [filterShow, setFilterShow] = useState(false);
  const [activeButton, setActiveButton] = useState("hardware");

  const handleButtonClick = () => {
    setIsActive((prev) => !prev);
  };

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
        <div className="repair content-radius">
          <div className="content__header repair__header">
            <h2>Repair & Replace</h2>
            <Button
              text="Send for Repair / Replace"
              className={"category--buttons button__blue"}
              icon={<IoMdAdd />}
            />
          </div>

          <div className="repair__content">
            <div className="repair__navigation">
              <Button
                text="Repair"
                onClick={handleButtonClick}
                isActive={isActive}
                className="assets__btn"
              />
              <Button
                text="Replace"
                onClick={handleButtonClick}
                isActive={!isActive}
                className="assets__btn"
              />
            </div>

            <div className="ams__filter ">
              <SearchInput/>
              <Button
                text="Filter"
                icon={<BsFunnel />}
                className="filter--button"
                handleClick={() => onFilterClick(!filterShow)}
              />
            </div>
            {isActive && <RepairDataTable size="8" />}
          </div>
        </div>
      </section>
    </>
  );
};

export default Repair;
