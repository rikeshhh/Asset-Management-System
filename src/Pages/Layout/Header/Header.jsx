import "./Header.css";
const Header = () => {
  return (
    <header className="header ">
      <div className="">
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
              <li>Dashboard</li>
              <li>Assets</li>
              <li>Procurement</li>
              <li>Repair & Replace</li>
            </ul>
          </div>
          <div className="bottom__list">
            <h4 className="navbar__title">Listing</h4>
            <ul className="navbar__list">
              <li>Employees</li>
              <li>Categories</li>
              <li>Locations</li>
              <li>Department</li>
              <div className="plans"></div>
              <li>Logout</li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
