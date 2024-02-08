import { Link } from "react-router-dom";
import "./UserTab.css";
import { profile } from "../../Component/Images/Image";
const UserTab = () => {
  return (
    <section className="usertab">
      <div className="profile">
        <div className="profile__heading">
          <h4 className="profile__name">Amod Suman</h4>
          <h6 className="profile__position">Admin</h6>
        </div>
        <figure>
          <img src={profile} alt="profile-image" />
        </figure>
      </div>
    </section>
  );
};

export default UserTab;
