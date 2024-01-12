import { Link } from "react-router-dom";
import "./UserTab.css";
const UserTab = () => {
  return (
    <section className="usertab">
                   <Link to="/profile" state={{ isDisabled: true }} className="navbar__link">
   <div className="profile">
        <div className="profile__heading">
          <h4 className="profile__name">Amod Suman</h4>
          <h6 className="profile__position">Admin</h6>
        </div>
        <figure>
          <img src="/src/assets/profile.svg" alt="profile-image" />
        </figure>
      </div>
   </Link>
    </section>
  );
};

export default UserTab;
