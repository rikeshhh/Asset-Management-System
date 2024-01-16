import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import Button from "../../Component/Button/Button";
import { RxDashboard } from "react-icons/rx";
import { PiDesktopTower } from "react-icons/pi";
import { PiShoppingCart } from "react-icons/pi";
import { PiWrench } from "react-icons/pi";
import { HiOutlineUser } from "react-icons/hi2";
import { PiListMagnifyingGlass } from "react-icons/pi";
import { FiMapPin } from "react-icons/fi";
import { GrGroup } from "react-icons/gr";
import { LuLogOut } from "react-icons/lu";

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
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "navbar__link--active" : "navbar__link"
              }
            >
              <li>
                <span>
                  <RxDashboard />
                </span>
                Dashboard
              </li>
            </NavLink>
            <NavLink
              to="/assets"
              className={({ isActive }) =>
                isActive ? "navbar__link--active" : "navbar__link"
              }
            >
              <li>
                <span>
                  <PiDesktopTower />
                </span>
                Assets
              </li>
            </NavLink>
            <NavLink
              to="/procurement"
              className={({ isActive }) =>
                isActive ? "navbar__link--active" : "navbar__link"
              }
            >
              <li>
                <span>
                  <PiShoppingCart />
                </span>
                Procurement
              </li>
            </NavLink>
            <NavLink
              to="/repair"
              className={({ isActive }) =>
                isActive ? "navbar__link--active" : "navbar__link"
              }
            >
              <li>
                <span>
                  <PiWrench />
                </span>
                Repair & Replace
              </li>
            </NavLink>
          </ul>
        </div>
        <div className="bottom__list">
          <h4 className="navbar__title">Listing</h4>
          <ul className="navbar__list">
            <NavLink
              to="/employees"
              className={({ isActive }) =>
                isActive ? "navbar__link--active" : "navbar__link"
              }
            >
              <li>
                <span>
                  <HiOutlineUser />
                </span>
                Employees
              </li>
            </NavLink>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive ? "navbar__link--active" : "navbar__link"
              }
            >
              <li>
                <span>
                  <PiListMagnifyingGlass />
                </span>
                Categories
              </li>
            </NavLink>
            <NavLink
              to="/location"
              className={({ isActive }) =>
                isActive ? "navbar__link--active" : "navbar__link"
              }
            >
              <li>
                <span>
                  <FiMapPin />
                </span>
                Locations
              </li>
            </NavLink>
            <NavLink
              to="/departments"
              className={({ isActive }) =>
                isActive ? "navbar__link--active" : "navbar__link"
              }
            >
              <li>
                <span>
                  <GrGroup />
                </span>
                Department
              </li>
            </NavLink>

            <div className="plans">
              <p>Want to increase your productivity?</p>
              <span>
                Get more from AMS with our business / enterprise plans!
              </span>
              <Link to="/plans" className="plans__link">
                <Button className={"plans__button"} text={"Go to plans"} />
              </Link>
            </div>
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive ? "navbar__link--active" : "navbar__link"
              }
            >
              <li>
                <span>
                  <LuLogOut />
                </span>
                Logout
              </li>
            </NavLink>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
