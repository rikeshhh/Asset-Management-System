import "./Login.css";
import { Link } from "react-router-dom";
import { Label } from "../../Component/Label/Label";
import { InputField } from "../../Component/Input/InputField";
import { useForm } from "react-hook-form";
import Button from "../../Component/Button/Button";
import validationRules from "../../Component/Validation/Validation.json";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (e, data) => {
    e.preventDefault;
    console.log("hello");
  };
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
          <form className="user__auth--form" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="user__auth--title">Login</h3>
            <div className="user__auth--input">
              {Object.keys(validationRules).map((fieldName) => {
                const rule = validationRules[fieldName];
                if (fieldName === "Username" || fieldName === "Password") {
                  return (
                    <>
                      <Label text={fieldName} />
                      <InputField
                        placeholder={rule.placeholder}
                        name={fieldName}
                        type={rule.type}
                        disabled={false}
                        register={register}
                        fieldName={fieldName}
                        rule={rule}
                        errors={errors}
                      />
                    </>
                  );
                }
              })}

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
          <div className="user__auth--bottom bottom__padding">
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
