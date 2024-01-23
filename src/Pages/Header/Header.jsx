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
import { DashboardSvg } from "../../Component/svg/DashboardSvg";
import { AssetsSvg } from "../../Component/svg/AssetsSvg";
import { ProcurementSvg } from "../../Component/svg/ProcurementSvg";
import { RepairSvg } from "../../Component/svg/RepairSvg";
import { EmployeeSvg } from "../../Component/svg/EmployeeSvg";
import { CategorySvg } from "../../Component/svg/CategorySvg";
import { LocationSvg } from "../../Component/svg/LocationSvg";
import { DepartmentSvg } from "../../Component/svg/DepartmentSvg";
import { LogoutSvg } from "../../Component/svg/LogoutSvg";

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
                isActive ? "navbar__link--active" : "link"
              }
            >
              <li>
                <span>
                  {/* <RxDashboard /> */}
                  <DashboardSvg />
                </span>
                <p>Dashboard</p>
              </li>
            </NavLink>
            <NavLink
              to="/assets"
              className={({ isActive }) =>
                isActive ? "navbar__link--active" : "link"
              }
            >
              <li>
                <span>
                  {/* <PiDesktopTower /> */}
                  <AssetsSvg />
                </span>
                <p>Assets</p>
              </li>
            </NavLink>
            <NavLink
              to="/procurement"
              className={({ isActive }) =>
                isActive ? "navbar__link--active" : "link"
              }
            >
              <li>
                <span>
                  {/* <PiShoppingCart /> */}
                  <ProcurementSvg />
                </span>
                <p>Procurement</p>
              </li>
            </NavLink>
            <NavLink
              to="/repair"
              className={({ isActive }) =>
                isActive ? "navbar__link--active" : "link"
              }
            >
              <li>
                <span>
                  {/* <PiWrench /> */}
                  <RepairSvg />
                </span>
                <p>Repair & Replace</p>
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
                isActive ? "navbar__link--active" : "link"
              }
            >
              <li>
                <span>
                  {/* <HiOutlineUser /> */}
                  <EmployeeSvg />
                </span>
                <p>Employees</p>
              </li>
            </NavLink>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive ? "navbar__link--active" : "link"
              }
            >
              <li>
                <span>
                  {/* <PiListMagnifyingGlass /> */}
                  <CategorySvg />
                </span>
                <p>Categories</p>
              </li>
            </NavLink>
            <NavLink
              to="/location"
              className={({ isActive }) =>
                isActive ? "navbar__link--active" : "link"
              }
            >
              <li>
                <span>
                  {/* <FiMapPin /> */}
                  <LocationSvg />
                </span>
                <p>Locations</p>
              </li>
            </NavLink>
            <NavLink
              to="/departments"
              className={({ isActive }) =>
                isActive ? "navbar__link--active" : "link"
              }
            >
              <li>
                <span>
                  {/* <GrGroup /> */}
                  <DepartmentSvg />
                </span>
                <p>Department</p>
              </li>
            </NavLink>

            <div className="plans">
              <p>Want to increase your productivity?</p>
              <span>
                Get more from AMS with our business / enterprise plans!
              </span>
              <Link to="/plans" className="plans__link">
                <Button
                  className={"button__style plans__button"}
                  text={"Go to plans"}
                />
              </Link>
            </div>
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive ? "navbar__link--active" : "link"
              }
            >
              <li>
                <span>
                  {/* <LuLogOut /> */}
                  <LogoutSvg />
                </span>
                <p>Logout</p>
              </li>
            </NavLink>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
