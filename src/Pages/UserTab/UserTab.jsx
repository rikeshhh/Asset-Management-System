import { Link, useNavigate } from "react-router-dom";
import "./UserTab.css";
import { profile } from "../../Component/Images/Image";
import { useQuery } from "@tanstack/react-query";
import { getEmployeeTableData } from "../Employees/EmployeeApiSlice";
import { getUserData } from "./userTabApi";
import { getUserIdFromLocalStorage } from "../../utils/StorageUtils";
import ImagePath from "../../Component/Images/ImagePath";
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

  // Check if userData exists before accessing its properties
  const userName = userData ? userData.name : "Loading...";
  const userType = userData ? userData.user_type : "Loading...";
  const userImage = userData ? userData.user_image : "Loading...";

  const gotToEmployeeView = () => {
    navigate("/viewEmployee", {
      state: { viewEmployeeData: userData },
    });
  };

  return (
    <section className="usertab">
      <div className="profile">
        <div className="profile__heading">
          {/* Render the user name and type */}
          <h4 className="profile__name">{userName}</h4>
          <h6 className="profile__position">{userType}</h6>
        </div>
        {/* Check if userData exists before rendering the image */}
        {userData && (
          <figure onClick={gotToEmployeeView}>
            <img src={profile} alt="click" />
          </figure>
        )}
      </div>
    </section>
  );
};

export default UserTab;
