import { Link } from "react-router-dom";
import "./Login.css";
const Login = () => {
  return (
    <section className="main-container login">
      <div className="user__auth">
        <div className="user__auth--top">
          <div className="user__auth--heading">AMS</div>
          <div className="user__auth--para">
            <p>Assets management system</p>
          </div>
        </div>
        <form className="user__auth--form">
          <h3 className="user__auth--title">Login</h3>
          <div className="user__auth--input">
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Enter your username" />

            <label htmlFor="password">Password</label>
            <input type="text" placeholder="Enter your password" />

            <div className="user__auth--checkbox">
              <input type="checkbox" />
              <span>Remember me</span>
            </div>
          </div>
          <Link to="/layout">
          <button className="user__auth--button" type="submit">
            Login
          </button>
          </Link>
       
        </form>
        <div className="user__auth--ques">
          <p>Dont have an account?</p>
          <Link to="/signup"><span>Signup</span></Link>     
        </div>
        <div className="user__auth--bottom">
          <p>
            Please contact the admin at{" "}
            <a href="mailto:admin@ams.com">admin@ams.com</a> for help
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
