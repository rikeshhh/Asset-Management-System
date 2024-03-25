import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Button from "../../Component/Button/Button";

const AssetsHead = () => {
  // Define state to store the ID of the assets to be deleted
  const [assetsId, setAssetsId] = useState();

  // Define state to manage the visibility of search items
  const [showSearchItem, setShowSearchItem] = useState(true);

  // Define state to manage the active button (e.g., hardware, software, etc.)
  const [activeButton, setActiveButton] = useState("hardware");

  // Access the navigate function from the react-router-dom package to handle navigation
  const navigate = useNavigate();

  /**
   * Handles the click to navigate to software.
   */
  

  /**
   * Handles the click to navigate to hardware.
   */
  const handleHardwareClick = () => {
    navigate("/assets/*");
  };
  const [isCompActive, setIsCompActive] = useState("Hardware");

  return (
    <section>
      <div className="assets content-radius">
        <div className="content__header assets__header">
          <h2>Assets</h2>
          <Link to="/assets/addAssets" className="link">
            <Button
              text="Add an Asset"
              className={"button__blue"}
              icon={<IoMdAdd />}
            />
          </Link>
        </div>

        <div className="assets__content">
          <div className="assets__navigation">
            <NavLink
              to="/assets/hardware"
              onClick={()=>{setIsCompActive("Hardware")}}
              className={
              isCompActive ==="Hardware" ? "assets__active" : "assets__inactive"
              }
            >
              <Button
                text="Hardware"
                handleClick={handleHardwareClick}
                className="assets__btn"
              />
            </NavLink>
            <NavLink
              to="/assets/software"
              onClick={()=>{setIsCompActive("Software")}}
              className={
              isCompActive ==="Software" ? "assets__active" : "assets__inactive"
              }
            >
              <Button
                text="Software"
                className="assets__btn"
              />
            </NavLink>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssetsHead;
