import { Link } from "react-router-dom";
import Button from "../../Component/Button/Button";
import "./Dashboard.css";

/**
 * Dashboard component: Work in progress.
 * @returns {JSX.Element} JSX element representing the Dashboard component upon completion.
 */
const Dashboard = () => {
  return (
    <section className="dashboard">
      <h3 className="ams__Dashboard">AMS DASHBOARD</h3>
      <p className="work__on--progress">Work On Progress</p>
      <span className="dashboard--span">
        Please continue checking other ui pages
      </span>
      <Link to="/assets" className="link">
        <Button className="button__blue" text="Go To Assets"></Button>
      </Link>
    </section>
  );
};

export default Dashboard;
