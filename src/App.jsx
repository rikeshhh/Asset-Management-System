import { Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./Pages/Sidebar/Sidebar";
import UserTab from "./Pages/UserTab/UserTab";

function App() {
  return (
    <div className="layout">
      <Sidebar />
      <UserTab />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
