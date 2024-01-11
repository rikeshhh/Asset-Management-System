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
            <Link to="/" className="navbar__link">
              <li>
                <img src="/src/assets/dashboard.svg" alt="" />
                Dashboard
              </li>
            </Link>
            <Link to="/assets" className="navbar__link">
              <li>
                <img src="/src/assets/assets.svg" alt="" />
                Assets
              </li>
            </Link>
            <Link to="/procurement" className="navbar__link">
              <li>
                <img src="/src/assets/procurement.svg" alt="" />
                Procurement
              </li>
            </Link>
            <Link to="/repair" className="navbar__link">
              <li>
                <img src="/src/assets/repair.svg" alt="" />
                Repair & Replace
              </li>
            </Link>
          </ul>
        </div>
        <div className="bottom__list">
          <h4 className="navbar__title">Listing</h4>
          <ul className="navbar__list">
            <Link to="/employees" className="navbar__link">
              <li>
                <img src="/src/assets/employee.svg" alt="" />
                Employees
              </li>
            </Link>
            <Link to="/categories" className="navbar__link">
              <li>
                <img src="/src/assets/categories.svg" alt="" />
                Categories
              </li>
            </Link>
            <Link to="/location" className="navbar__link">
              <li>
                <img src="/src/assets/location.svg" alt="" />
                Locations
              </li>
            </Link>
            <Link to="/departments" className="navbar__link">
              <li>
                <img src="/src/assets/department.svg" alt="" />
                Department
              </li>
            </Link>

            <div className="plans"></div>
            <Link to="" className="navbar__link">
              <li>
                <img src="/src/assets/logout.svg" alt="" />
                Logout
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
