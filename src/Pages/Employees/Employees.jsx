// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { InputField } from "../../Component/Input/InputField";
// import Table from "../../Component/Table/Table";
// import "./Employee.css";
// import Model from "../../Component/Model/Model";
// import { HiMiniMagnifyingGlass } from "react-icons/hi2";
// import Button from "../../Component/Button/Button";
// import { IoMdAdd } from "react-icons/io";
// import { BsFunnel } from "react-icons/bs";
// import { Link, useNavigate } from "react-router-dom";
// import Filter from "../../Component/Filter/Filter";
// import EmployeeDataTable from "./EmployeeDataTable";
// import { DeleteConfirmation } from "../../Component/DeleteConfirmation/DeleteConfirmation";
// import { employeeDelete } from "./EmployeeApiSlice";
// import { useMutation } from "@tanstack/react-query";
// import { queryClient } from "../../Component/Query/Query";
// import { notifyError } from "../../Component/Toast/Toast";

// const Employees = () => {
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//   } = useForm();

//   const navigate = useNavigate();

//   const DeleteEmployee = useMutation({
//     mutationFn: (employeeId) => {
//       return employeeDelete(employeeId);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries("EmployeeData");
//     },
//     onError: (error) => {
//       notifyError(error.message);
//       if (error.response.status === 401) {
//         notifyError("Unauthorized: Please log in with valid id.");
//       }
//     },
//   });

//   const [filterShow, setFilterShow] = useState(false);
//   const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);
//   const [employeeId, setEmployeeId] = useState("");

//   const onFilterClick = (showHide) => {
//     // console.log(showHide);
//     console.log("Filter state changed:", showHide);
//     setFilterShow(showHide);
//   };

//   // const handleBodyClick = (e) => {
//   //   // Check if the clicked element is not part of the filter component
//   //   if (
//   //     !e.target.closest(".ams__filter") &&
//   //     !e.target.closest(".filter--button") &&
//   //     !e.target.closest(".filter__form")
//   //   ) {
//   //     setFilterShow(false);
//   //   }
//   // };

//   // useEffect(() => {
//   //   document.body.addEventListener("click", handleBodyClick);

//   //   return () => {
//   //     document.body.removeEventListener("click", handleBodyClick);
//   //   };
//   // }, []);

//   const handleDeleteClick = (employee) => {
//     setDeleteConfirationShow(true);
//     setEmployeeId(employee);
//   };

//   const handleCancelClick = () => {
//     setDeleteConfirationShow(false);
//   };

//   const handleProceedClick = () => {
//     DeleteEmployee.mutate(employeeId);
//     setDeleteConfirationShow(false);
//   };

//   const handleTableEdit = (employeeData) => {
//     navigate("/editProfile", {
//       state: { employeeData: employeeData },
//     });
//   };
//   const handleBodyClick = () => {
//     console.log("handleBodyClicked");
//     setFilterShow(false);
//   };
//   return (
//     <>
//       {deleteConfirationShow ? (
//         <DeleteConfirmation
//           deleteName="employee"
//           handleCancelClick={handleCancelClick}
//           handleProceedClick={handleProceedClick}
//         />
//       ) : (
//         <></>
//       )}
//       <section className="content-wrapper">
//         <div className="content-radius employees">
//           <div className="content__header employees__top">
//             <h2>Employees</h2>
//             <Link to="/addProfile" className="link">
//               <Button
//                 text={"Add A Profile"}
//                 className={" button__blue"}
//                 icon={<IoMdAdd />}
//               />
//             </Link>
//           </div>
//           <div className="employees__table">
//             <div className="ams__filter">
//               <InputField
//                 name="Search"
//                 register={register}
//                 errors={errors}
//                 placeholder={"Search"}
//                 type={Model.Group.type}
//                 value={Model.Group.pattern.value}
//                 message={Model.Group.pattern.message}
//                 icon={<HiMiniMagnifyingGlass />}
//               />
//               <Button
//                 handleClick={() => onFilterClick(!filterShow)}
//                 text="Filter"
//                 icon={<BsFunnel />}
//                 className="filter--button"
//               />
//             </div>
//             <EmployeeDataTable
//               handleDeleteClick={handleDeleteClick}
//               handleProceedClick={handleProceedClick}
//               handleTableEdit={handleTableEdit}
//             />
//           </div>
//         </div>
//       </section>
//       {/* {filterShow && (
//         <Filter
//           handleClick={() => onFilterClick(!filterShow)}
//           handleBodyClick={handleBodyClick}
//           filterShow={filterShow}
//         />
//       )} */}
//       {filterShow && (
//         <Filter
//           handleClick={() => onFilterClick(!filterShow)}
//           handleBodyClick={handleBodyClick}
//           filterShow={filterShow}
//         />
//       )}
//     </>
//   );
// };

// export default Employees;

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputField } from "../../Component/Input/InputField";
import Table from "../../Component/Table/Table";
import "./Employee.css";
import Model from "../../Component/Model/Model";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import Button from "../../Component/Button/Button";
import { IoMdAdd } from "react-icons/io";
import { BsFunnel } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Filter from "../../Component/Filter/Filter";
import EmployeeDataTable from "./EmployeeDataTable";
import { DeleteConfirmation } from "../../Component/DeleteConfirmation/DeleteConfirmation";
import { employeeDelete } from "./EmployeeApiSlice";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../Component/Query/Query";
import { notifyError } from "../../Component/Toast/Toast";

const Employees = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const DeleteEmployee = useMutation({
    mutationFn: (employeeId) => {
      return employeeDelete(employeeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("EmployeeData");
    },
    onError: (error) => {
      notifyError(error.message);
      if (error.response.status === 401) {
        notifyError("Unauthorized: Please log in with valid id.");
      }
    },
  });

  const [filterShow, setFilterShow] = useState(false);
  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);
  const [employeeId, setEmployeeId] = useState("");

  const onFilterClick = (showHide) => {
    setFilterShow(showHide);
  };

  // const handleBodyClick = (e) => {
  //   // Check if the clicked element is not part of the filter component
  //   if (
  //     !e.target.closest(".ams__filter") &&
  //     !e.target.closest(".filter--button") &&
  //     !e.target.closest(".filter__form")
  //   ) {
  //     setFilterShow(false);
  //   }
  // };

  // useEffect(() => {
  //   document.body.addEventListener("click", handleBodyClick);

  //   return () => {
  //     document.body.removeEventListener("click", handleBodyClick);
  //   };
  // }, []);

  const toggleFilter = () => {
    setFilterShow(!filterShow);
  };

  const handleDeleteClick = (employee) => {
    setDeleteConfirationShow(true);
    setEmployeeId(employee);
  };

  const handleCancelClick = () => {
    setDeleteConfirationShow(false);
  };

  const handleProceedClick = () => {
    DeleteEmployee.mutate(employeeId);
    setDeleteConfirationShow(false);
  };

  const handleTableEdit = (employeeData) => {
    navigate("/editProfile", {
      state: { employeeData: employeeData },
    });
  };

  return (
    <>
      {deleteConfirationShow ? (
        <DeleteConfirmation
          deleteName="employee"
          handleCancelClick={handleCancelClick}
          handleProceedClick={handleProceedClick}
        />
      ) : (
        <></>
      )}
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
            <EmployeeDataTable
              handleDeleteClick={handleDeleteClick}
              handleProceedClick={handleProceedClick}
              handleTableEdit={handleTableEdit}
            />
          </div>
        </div>
      </section>
      {/* {filterShow && <Filter handleClick={() => onFilterClick(!filterShow)} />} */}
      {filterShow && (
        <Filter
          handleClick={() => onFilterClick(!filterShow)}
          toggleFilter={toggleFilter}
        />
      )}
    </>
  );
};

export default Employees;
