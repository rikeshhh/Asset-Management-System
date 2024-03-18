import { Link, useNavigate } from "react-router-dom";
import "./UserTab.css";
import { profile } from "../../Component/Images/Image";
import { useQuery } from "@tanstack/react-query";
import { getEmployeeTableData } from "../Employees/EmployeeApiSlice";
import { getUserData } from "./userTabApi";
import { getUserIdFromLocalStorage } from "../../utils/StorageUtils";
const UserTab = () => {
  const userId = getUserIdFromLocalStorage();
  const {
    isPending,
    error,
    data: userData,
  } = useQuery({
    queryKey: ["searchedData", userId],
    queryFn: () => getUserData(userId),
  });
  const navigate = useNavigate();
  const gotToEmployeeView = () => {
    navigate("/viewEmployee", {
      state: { viewEmployeeData: userData },
    });
  };
  console.log(userData);
  return (
    <section className="usertab">
      <div className="profile">
        <div className="profile__heading">
          <h4 className="profile__name">Amod Suman</h4>
          <h6 className="profile__position">Admin</h6>
        </div>
        <figure onClick={gotToEmployeeView}>
          <img src={profile} alt="profile-image" />
        </figure>
      </div>
    </section>
  );
};

export default UserTab;
