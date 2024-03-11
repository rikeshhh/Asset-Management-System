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
import { Link } from "react-router-dom";
import ReplaceDataTable from "./ReplaceDataTable";

const Repair = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [isCompActive, setIsCompActive] = useState(true);
  const [filterShow, setFilterShow] = useState(false);

  const handleButtonClick = () => {
    setIsCompActive((prev) => !prev);
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
                onClick={handleButtonClick}
                className={
                  isCompActive
                    ? "repair-replace__comp active__repair"
                    : "repair-replace__comp"
                }
              >
                Repair
              </h6>
              <h6
                onClick={handleButtonClick}
                className={
                  isCompActive
                    ? "repair-replace__comp "
                    : "repair-replace__comp active__repair"
                }
              >
                Replace
              </h6>
            </div>

            {isCompActive ? (
              <RepairDataTable
                filterShow={filterShow}
                onFilterClick={() => onFilterClick(!filterShow)}
              />
            ) : (
              <ReplaceDataTable
                filterShow={filterShow}
                onFilterClick={() => onFilterClick(!filterShow)}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Repair;
