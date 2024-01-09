import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <header className="header ">
      <div className="header__title">
        <h3 className="header__heading">AMS</h3>
        <div className="header__subheading">
          <p>Assets management system</p>
        </div>
      </div>
      <nav className="navbar">
        <div className="top__list">
          <h4 className="navbar__title " id="top__title">
            System
          </h4>
          <ul className="navbar__list">
            <Link to="/layout/">
              <li>Dashboard</li>
            </Link>
            <Link to="layout/assets">
              <li>Assets</li>
            </Link>
            <Link to="layout/procurement">
              <li>Procurement</li>
            </Link>
            <Link to="layout/repair">
              <li>Repair & Replace</li>
            </Link>
          </ul>
        </div>
        <div className="bottom__list">
          <h4 className="navbar__title">Listing</h4>
          <ul className="navbar__list">
            <Link to="layout/employees">
              <li>Employees</li>
            </Link>
            <Link to="layout/categories">
              <li>Categories</li>
            </Link>
            <Link to="layout/location">
              <li>Locations</li>
            </Link>
            <Link to="layout/departments">
              <li>Department</li>
            </Link>

            <div className="plans"></div>
            <Link to="layout/logout">
              <li>Logout</li>
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
