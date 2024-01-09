import { Outlet } from "react-router-dom";
import UserTab from "./Pages/Layout/UserTab/UserTab";
import Header from "./Pages/Layout/Header/Header";

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        <UserTab />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
