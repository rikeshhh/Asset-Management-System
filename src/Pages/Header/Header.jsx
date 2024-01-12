import { Link } from "react-router-dom";
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
            <Link to="/" className="navbar__link">
              <li>
                <span>
                  <RxDashboard />
                </span>
                Dashboard
              </li>
            </Link>
            <Link to="/assets" className="navbar__link">
              <li>
                <span>
                  <PiDesktopTower />
                </span>
                Assets
              </li>
            </Link>
            <Link to="/procurement" className="navbar__link">
              <li>
                <span>
                  <PiShoppingCart />
                </span>
                Procurement
              </li>
            </Link>
            <Link to="/repair" className="navbar__link">
              <li>
                <span>
                  <PiWrench />
                </span>
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
                <span>
                  <HiOutlineUser />
                </span>
                Employees
              </li>
            </Link>
            <Link to="/categories" className="navbar__link">
              <li>
                <span>
                  <PiListMagnifyingGlass />
                </span>
                Categories
              </li>
            </Link>
            <Link to="/location" className="navbar__link">
              <li>
                <span>
                  <FiMapPin />
                </span>
                Locations
              </li>
            </Link>
            <Link to="/departments" className="navbar__link">
              <li>
                <span>
                  <GrGroup />
                </span>
                Department
              </li>
            </Link>

            <div className="plans">
              <p>Want to increase your productivity?</p>
              <span>
                Get more from AMS with our business / enterprise plans!
              </span>
              <Link to="/plans">
                <Button className={"plans__button"} text={"Go to plans"} />
              </Link>
            </div>
            <Link to="" className="navbar__link">
              <li>
                <span>
                  <LuLogOut />
                </span>
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
