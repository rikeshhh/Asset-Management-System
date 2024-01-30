import { Link } from "react-router-dom";
import Button from "../../Component/Button/Button";
import "./Dashboard.css";
const Dashboard = () => {
  return (
    <section className="dashboard">
      <h3>AMS DASHBOARD</h3>
      <p>Work On Progress</p>
      <span>Please continue checking other ui pages</span>
      <Button text={"Go to Assets"} linkUrl={"/assets"} />
      <h1>Go to LOGIN & SIGNUP pages</h1>
      <Link to="/login">
        <button>LOGIN</button>
      </Link>
    </section>
  );
};

export default Dashboard;
