import { Link, NavLink } from "react-router-dom";
import "./Sidebar.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa6";
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
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [toggleNavbar, setToggleNavbar] = useState(false);

  const handleToggle = () => {
    setToggleNavbar(!toggleNavbar);
  };

  const handleSmallToggle = () => {
    setToggleNavbar(!toggleNavbar);
  };

  return (
    <>
      <header className={toggleNavbar ? " sidebar" : " sidebar sidebar__res"}>
        <div
          className={
            toggleNavbar
              ? "sidebar__toggle--extended sidebar__toggle"
              : "sidebar__toggle "
          }
        >
          <RxHamburgerMenu
            onClick={handleToggle}
            className={toggleNavbar ? "hamburger__none" : "hamburger"}
          />
          <IoClose
            onClick={handleToggle}
            className={toggleNavbar ? "hamburger" : "hamburger__none"}
          />
        </div>
        <div className="sidebar__title">
          <div>
            <h3 className="sidebar__heading">AMS</h3>
            <div className="sidebar__subheading">
              <p>Assets management system</p>
            </div>
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
                onClick={() =>
                  toggleNavbar ? setToggleNavbar(!toggleNavbar) : null
                }
                className={({ isActive }) =>
                  isActive ? "navbar__link--active" : "link"
                }
              >
                <li
                  className={
                    toggleNavbar
                      ? "navbar__list--point"
                      : "navbar__list--toggle"
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
                onClick={() =>
                  toggleNavbar ? setToggleNavbar(!toggleNavbar) : null
                }
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
                onClick={() =>
                  toggleNavbar ? setToggleNavbar(!toggleNavbar) : null
                }
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
                onClick={() =>
                  toggleNavbar ? setToggleNavbar(!toggleNavbar) : null
                }
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
                onClick={() =>
                  toggleNavbar ? setToggleNavbar(!toggleNavbar) : null
                }
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
                onClick={() =>
                  toggleNavbar ? setToggleNavbar(!toggleNavbar) : null
                }
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
                onClick={() =>
                  toggleNavbar ? setToggleNavbar(!toggleNavbar) : null
                }
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
                onClick={() =>
                  toggleNavbar ? setToggleNavbar(!toggleNavbar) : null
                }
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
                    handleClick={() =>
                      toggleNavbar ? setToggleNavbar(!toggleNavbar) : null
                    }
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
    </>
  );
};

export default Sidebar;
