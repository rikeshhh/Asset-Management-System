import "./Login.css";
import { Link } from "react-router-dom";
import { Label } from "../../Component/Label/Label";
import { InputField } from "../../Component/Input/InputField";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../Component/Button/Button";
import Model from "../../Component/Model/Model";

const Login = () => {
  const formMethod = useForm();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = formMethod;

  const submitData = (data) => {
    console.log(data);
  };

  return (
    <section className="main-container signup">
      <div className="user__auth">
        <div className="user__auth__content">
          <div className="user__auth--top">
            <div className="user__auth--heading">AMS</div>
            <div className="user__auth--para">
              <p>Assets management system</p>
            </div>
          </div>
          <FormProvider {...formMethod}>
            <form
              className="user__auth--form"
              onSubmit={handleSubmit(submitData)}
            >
              <h3 className="user__auth--title">Login</h3>
              <div className="user__auth--input">
                <Label text="Username" />
                <InputField
                  name="Username"
                  register={register}
                  required={Model.Username.required}
                  value={Model.Username.value}
                  message={Model.Username.message}
                  errors={errors}
                  type={Model.Username.type}
                  placeholder={Model.Username.placeholder}
                  minLength={Model.Username.minLength}
                  maxLength={Model.Username.maxLength}
                />
                <Label text="Password" />
                <InputField
                  name="Password"
                  register={register}
                  value={Model.Password.value}
                  message={Model.Password.message}
                  required={Model.Password.required}
                  errors={errors}
                  type={Model.Password.type}
                  placeholder={Model.Password.placeholder}
                  minLength={Model.Email.minLength.value}
                  maxLength={Model.Email.maxLength.value}
                />

                <div className="user__auth--ques">
                  <p>Dont have an account?</p>
                  <Link to="/signup">
                    <span>Signup</span>
                  </Link>
                </div>
                <Button
                  text="Login"
                  className={"user__auth--button"}
                  value="submit"
                />
              </div>
            </form>
          </FormProvider>
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
