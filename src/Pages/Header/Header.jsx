import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import { FiChevronRight } from "react-icons/fi";
import Button from "../../Component/Button/Button";
import { DashboardSvg } from "../../Component/svg/DashboardSvg";
import { AssetsSvg } from "../../Component/svg/AssetsSvg";
import { ProcurementSvg } from "../../Component/svg/ProcurementSvg";
import { RepairSvg } from "../../Component/svg/RepairSvg";
import { EmployeeSvg } from "../../Component/svg/EmployeeSvg";
import { CategorySvg } from "../../Component/svg/CategorySvg";
import { LocationSvg } from "../../Component/svg/LocationSvg";
import { DepartmentSvg } from "../../Component/svg/DepartmentSvg";
import { LogoutSvg } from "../../Component/svg/LogoutSvg";
import { useState } from "react";

const Header = () => {
  const [toggleNavbar, setToggleNavbar] = useState(false);

  const handleNavbar = () => {
    setToggleNavbar((prev) => !prev);
  };

  return (
    <header className={toggleNavbar ? " header" : "header__res header "}>
      <div className="header__arrow" onClick={handleNavbar}>
        <FiChevronRight className={toggleNavbar ? "arrow" : "arrow__close"} />
      </div>
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
              <li
                className={
                  toggleNavbar ? "navbar__list--point" : "navbar__list--toggle"
                }
              >
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
              <li className={toggleNavbar ? "" : "navbar__list--toggle"}>
                <span title="Assets">
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
              <li className={toggleNavbar ? "" : "navbar__list--toggle"}>
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
              <li className={toggleNavbar ? "" : "navbar__list--toggle"}>
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
              <li className={toggleNavbar ? "" : "navbar__list--toggle"}>
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
              <li className={toggleNavbar ? "" : "navbar__list--toggle"}>
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
              <li className={toggleNavbar ? "" : "navbar__list--toggle"}>
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
              <li className={toggleNavbar ? "" : "navbar__list--toggle"}>
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
              <li className={toggleNavbar ? "" : "navbar__list--toggle"}>
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
