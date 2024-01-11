import "./Login.css";
import { Link } from "react-router-dom";
import { Label } from "../../Component/Label/Label";
import { InputField } from "../../Component/Input/InputField";
import { useForm } from "react-hook-form";
import Button from "../../Component/Button/Button";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  return (
    <section className="main-container login">
      <div className="user__auth">
        <div className="user__auth__content">
          <div className="user__auth--top">
            <div className="user__auth--heading">AMS</div>
            <div className="user__auth--para">
              <p>Assets management system</p>
            </div>
          </div>
          <form className="user__auth--form" onSubmit={handleSubmit()}>
            <h3 className="user__auth--title">Login</h3>
            <div className="user__auth--input">
              <Label text={"Username"} />
              <InputField
                name="Username"
                placeholder="Enter your username"
                type="text"
                pattern={{
                  value: /^[a-zA-Z0-9_]+$/,
                  message:
                    "Invalid username format (alphanumeric characters and underscores)",
                }}
                register={register}
                errors={errors}
              />

              <Label text={"Password"} />
              <InputField
                name={"Password"}
                placeholder={"Enter your username"}
                type={"password"}
                pattern={{
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // Example password pattern (at least 8 characters, at least one letter, and one number)
                  message:
                    "Invalid password format (at least 8 characters, at least one letter, and one number)",
                }}
                register={register}
                errors={errors}
              />
              <div className="user__auth--checkbox">
                <input type="checkbox" />
                <span>Remember me</span>
              </div>
            </div>
            <Button
              className={"user__auth--button"}
              text="Login"
              value="submit"
            />
          </form>
          <div className="user__auth--ques">
            <p>Dont have an account?</p>
            <Link to="/signup">
              <span>Signup</span>
            </Link>
          </div>
          <div className="user__auth--bottom">
            <p>
              Please contact the admin at{" "}
              <a href="mailto:admin@ams.com">admin@ams.com</a> for help
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
