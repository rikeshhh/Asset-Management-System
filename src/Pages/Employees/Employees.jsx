import { useForm } from "react-hook-form";
import { InputField } from "../../Component/Input/InputField";
import Table from "../../Component/Table/Table";
import "./Employee.css";
import Model from "../../Component/Model/Model";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import Button from "../../Component/Button/Button";
import { IoMdAdd } from "react-icons/io";
import { BsFunnel } from "react-icons/bs";
import { Link } from "react-router-dom";
import Filter from "../../Component/Filter/Filter";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getTokenFromLocalStorage } from "../../utils/StorageUtils";

const Employees = () => {
  const token = getTokenFromLocalStorage();
  console.log(token);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // const { isPending, error, data } = useQuery({
  //   queryKey: ["resp"],
  //   queryFn: () => {
  //     axios.get("https://ams.webo.dev/user").then((resp) => {
  //       const response = resp.data;
  //       console.log("api response: ", response);
  //     });
  //   },
  // });

  // if (isPending) {
  //   console.log("pending");
  // }

  // if (error) {
  //   console.log("error");
  // }

  const userData = async () => {
    const response = await axios.get("https://ams.webo.dev/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const respData = await response.data;
    console.log(respData);
    return;
  };
  userData();
  const [filterShow, setFilterShow] = useState(false);

  const onFilterClick = (showHide) => {
    setFilterShow(showHide);
  };
  return (
    <>
      <section className="content-wrapper">
        <div className="content-radius employees">
          <div className="content__header employees__top">
            <h2>Employees</h2>
            <Link to="/addProfile" className="link">
              <Button
                text={"Add A Profile"}
                className={" button__blue"}
                icon={<IoMdAdd />}
              />
            </Link>
          </div>
          <div className="employees__table">
            <div className="ams__filter">
              <InputField
                name="Search"
                register={register}
                errors={errors}
                placeholder={"Search"}
                type={Model.Group.type}
                value={Model.Group.pattern.value}
                message={Model.Group.pattern.message}
                icon={<HiMiniMagnifyingGlass />}
              />
              <Button
                handleClick={() => onFilterClick(!filterShow)}
                text="Filter"
                icon={<BsFunnel />}
                className="filter--button"
              />
            </div>
            {/* <Table serverPath={"/user"} linkTo={"/editProfile"} /> */}
            {/* <div>{data.map()}</div> */}
          </div>
        </div>
      </section>
      {filterShow && <Filter handleClick={() => onFilterClick(!filterShow)} />}
    </>
  );
};

export default Employees;
