import { Link } from "react-router-dom";
import Button from "../../Component/Button/Button";
import "./Dashboard.css";
const Dashboard = () => {
  return (
    <section className="dashboard">
      <h3 className="ams__Dashboard">AMS DASHBOARD</h3>
      <p className="work__on--progress">Work On Progress</p>
      <span className="dashboard--span">Please continue checking other ui pages</span>
      <Button className='button__blue' text="Go To Assets">
        <Link to="/assets">
        </Link>
      </Button>
    </section>
  );
};

export default Dashboard;
