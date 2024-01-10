import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./Pages/Header/Header";
import UserTab from "./Pages/UserTab/UserTab";

function App() {
  return (
    <div className="layout">
    <Header />
    <main className="main-content">
      <UserTab />
      <Outlet />
    </main>
  </div>
);
}

export default App;
